'use client'

import React, { useEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function DemoSpritePage() {
  // Next.js 15: ใช้ useParams ใน client component แทนรับ params ตรงๆ
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const requestRef = useRef<number | null>(null)
  const shipPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const controlsRef = useRef({ left: false, right: false, up: false, down: false })
  const scaleRef = useRef<number>(1)
  const baseScaleRef = useRef<number>(1)
  const cameraRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  // ขนาดโลกจะถูกตั้งให้เท่ากับขนาดแคนวาส เพื่อให้มองเห็นทั้งแมพตลอดเวลา
  const worldSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 })
  const draggingRef = useRef<boolean>(false)
  // เก็บขนาดวาดล่าสุดของสไปรต์ (หน่วย logic px) เพื่อใช้คำนวณ anchor ให้ตรง แม้ไฟล์จะไม่ใช่ 32x32
  const drawSizeRef = useRef<{ w: number; h: number }>({ w: 32, h: 32 })
  // anchor ภายในกรอบเฟรม (หน่วย 0..1) สำหรับคำนวณตำแหน่งอ้างอิง
  // เดสก์ท็อป: ใช้กึ่งกลางล่าง (ปลายหาง)
  const desktopAnchorRef = useRef<{ ax: number; ay: number }>({ ax: 0.5, ay: 0.0 })
  // ทัช/มือถือ: ใช้กึ่งกลางตัวรถ
  const touchAnchorRef = useRef<{ ax: number; ay: number }>({ ax: 0.5, ay: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // อัปเดต anchor ทุกครั้งที่เมาท์เอฟเฟกต์ เพื่อให้การแก้ค่าเห็นผลทันทีแม้มี HMR
    desktopAnchorRef.current = { ax: 0.5, ay: 0.5 }
    touchAnchorRef.current = { ax: 0.5, ay: 0.5 }

    // ตั้งค่าขนาดแคนวาสตามหน้าจออย่างง่าย
    const DPR = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    // แนวตั้งสำหรับเดสก์ท็อป (สี่เหลี่ยมผืนผ้าแนวตั้ง ไม่เกินจอทั่วไป)
    const logicalWidth = 540
    const logicalHeight = 710
    canvas.width = logicalWidth * DPR
    canvas.height = logicalHeight * DPR
    canvas.style.width = `${logicalWidth}px`
    canvas.style.height = `${logicalHeight}px`
    ctx.scale(DPR, DPR)
    ctx.imageSmoothingEnabled = false

    // กำหนดขนาดโลกให้เท่ากับขนาดจอ (กล้องจะไม่เคลื่อนที่)
    worldSizeRef.current.w = logicalWidth
    worldSizeRef.current.h = logicalHeight
    cameraRef.current.x = 0
    cameraRef.current.y = 0

    // โหลดสไปรต์ (มีเว้นวรรคในชื่อไฟล์ จึงใช้ %20)
    const img = new Image()
    // ใช้ absolute URL กันโดน prefix ด้วยเส้นทางภาษา (/en/...)
    img.src = `${window.location.origin}/game/sprites/player/Spaceship_01_NAVY%20BLUE.png`

    let isCancelled = false
    let last = performance.now()

    // ตั้งค่ากริดเฟรม (แก้ให้ตรงกับไฟล์จริงได้ง่าย ๆ)
    const FRAME_W = 32
    const FRAME_H = 32
    const FRAME_DURATION_MS = 90

    // จะคำนวณ columns หลังรูปโหลดเสร็จ
    let columns = 1
    let frames = 1
    let frameIndex = 0
    let acc = 0
    let frameW = FRAME_W
    let frameH = FRAME_H
    let initialized = false

    function drawBackground() {
      // พื้นหลังเรียบ + กริดอ่อน ๆ
      if (!ctx) return
      ctx.fillStyle = '#0b1020'
      ctx.fillRect(0, 0, logicalWidth, logicalHeight)
      ctx.strokeStyle = 'rgba(255,255,255,0.05)'
      ctx.lineWidth = 1
      const grid = 32
      const camX = cameraRef.current.x
      const camY = cameraRef.current.y
      const startX = -((camX % grid) + grid) % grid
      const startY = -((camY % grid) + grid) % grid
      for (let x = startX; x <= logicalWidth; x += grid) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, logicalHeight)
        ctx.stroke()
      }
      for (let y = startY; y <= logicalHeight; y += grid) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(logicalWidth, y)
        ctx.stroke()
      }
    }

    // คอนโทรลคีย์บอร์ด
    const onKeyDown = (e: KeyboardEvent) => {
      // ใช้ e.code เพื่อไม่พึ่ง layout คีย์บอร์ด (ไทย/อังกฤษ)
      if (e.code === 'KeyA') { controlsRef.current.left = true; e.preventDefault() }
      if (e.code === 'KeyD') { controlsRef.current.right = true; e.preventDefault() }
      if (e.code === 'KeyW') { controlsRef.current.up = true; e.preventDefault() }
      if (e.code === 'KeyS') { controlsRef.current.down = true; e.preventDefault() }
      if (e.key === '+') scaleRef.current = Math.min(4, scaleRef.current + 0.1)
      if (e.key === '-') scaleRef.current = Math.max(0.25, scaleRef.current - 0.1)
    }
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyA') controlsRef.current.left = false
      if (e.code === 'KeyD') controlsRef.current.right = false
      if (e.code === 'KeyW') controlsRef.current.up = false
      if (e.code === 'KeyS') controlsRef.current.down = false
    }
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)

    // โหมดลาก: แตะค้างแล้วลาก ยานจะย้ายไปตามนิ้ว/เมาส์
    const getPointerPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) * (canvas.width / rect.width) / (Math.max(1, Math.floor(window.devicePixelRatio || 1)))
      const y = (e.clientY - rect.top) * (canvas.height / rect.height) / (Math.max(1, Math.floor(window.devicePixelRatio || 1)))
      return { x, y }
    }
    const getTopLeftFromPointer = (
      e: PointerEvent,
      p: { x: number; y: number },
      drawW: number,
      drawH: number,
    ) => {
      const anchor = e.pointerType === 'mouse' ? desktopAnchorRef.current : touchAnchorRef.current
      return { x: p.x - drawW * anchor.ax, y: p.y - drawH * anchor.ay }
    }
    const onPointerDown = (e: PointerEvent) => {
      draggingRef.current = true
      const p = getPointerPos(e)
      // ใช้ขนาดวาดจริงล่าสุดแทนค่า FRAME_W/H คงที่
      const drawW = drawSizeRef.current.w
      const drawH = drawSizeRef.current.h
      const topLeft = getTopLeftFromPointer(e, p, drawW, drawH)
      shipPosRef.current.x = Math.max(0, Math.min(worldSizeRef.current.w - drawW, topLeft.x))
      shipPosRef.current.y = Math.max(0, Math.min(worldSizeRef.current.h - drawH, topLeft.y))
      e.preventDefault()
    }
    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return
      const p = getPointerPos(e)
      const drawW = drawSizeRef.current.w
      const drawH = drawSizeRef.current.h
      const topLeft = getTopLeftFromPointer(e, p, drawW, drawH)
      shipPosRef.current.x = Math.max(0, Math.min(worldSizeRef.current.w - drawW, topLeft.x))
      shipPosRef.current.y = Math.max(0, Math.min(worldSizeRef.current.h - drawH, topLeft.y))
      e.preventDefault()
    }
    const onPointerUp = () => {
      draggingRef.current = false
    }
    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)

    function loop(now: number) {
      if (isCancelled) return
      const dt = now - last
      last = now

      drawBackground()

      if (img.complete && img.naturalWidth > 0) {
        // คำนวณครั้งเดียวหลังรูปโหลด
        if (!initialized) {
          const colsGuess = Math.floor(img.naturalWidth / FRAME_W)
          const rowsGuess = Math.floor(img.naturalHeight / FRAME_H)
          const looksLikeSheet = colsGuess >= 1 && rowsGuess >= 1 && (colsGuess * FRAME_W === img.naturalWidth) && (rowsGuess * FRAME_H === img.naturalHeight)
          if (looksLikeSheet) {
            columns = Math.max(1, colsGuess)
            const rows = Math.max(1, rowsGuess)
            frames = columns * rows
            frameW = FRAME_W
            frameH = FRAME_H
          } else {
            // ไฟล์เป็นรูปเดี่ยว ไม่ใช่สไปรต์ชีต
            columns = 1
            frames = 1
            frameW = img.naturalWidth
            frameH = img.naturalHeight
          }
          // ตั้งสเกลก่อน แล้วค่อยคำนวณตำแหน่งเริ่มให้กึ่งกลางจริง ด้วยขนาดที่ถูกสเกลแล้ว
          const targetHeight = 120
          baseScaleRef.current = Math.min(2, Math.max(0.25, targetHeight / frameH))
          scaleRef.current = baseScaleRef.current
          const initDrawW = frameW * scaleRef.current
          const initDrawH = frameH * scaleRef.current
          // จัดกึ่งกลางโดยยึด anchor เป็นจุดกลางจอ (สำหรับเริ่มต้นใช้กึ่งกลางตัวรถ)
          const initAnchor = touchAnchorRef.current
          shipPosRef.current.x = logicalWidth / 2 - initDrawW * initAnchor.ax
          shipPosRef.current.y = logicalHeight / 2 - initDrawH * initAnchor.ay
          initialized = true
        }

        // อัปเดตอนิเมชัน
        acc += dt
        if (acc >= FRAME_DURATION_MS) {
          acc = 0
          frameIndex = (frameIndex + 1) % frames
        }

        // อัปเดตตำแหน่งตามคีย์บอร์ดในโลก (world)
        const speed = 500
        const move = (speed * dt) / 1000
        if (controlsRef.current.left) shipPosRef.current.x -= move
        if (controlsRef.current.right) shipPosRef.current.x += move
        if (controlsRef.current.up) shipPosRef.current.y -= move
        if (controlsRef.current.down) shipPosRef.current.y += move

        const sx = (frameIndex % columns) * frameW
        const sy = Math.floor(frameIndex / columns) * frameH

        const drawW = frameW * scaleRef.current
        const drawH = frameH * scaleRef.current
        // อัปเดตขนาดวาดล่าสุดสำหรับตัวคำนวณ anchor/pointer
        drawSizeRef.current.w = drawW
        drawSizeRef.current.h = drawH
        // จำกัดขอบเขตไม่ให้ออกนอกโลก (world)
        shipPosRef.current.x = Math.max(0, Math.min(worldSizeRef.current.w - drawW, shipPosRef.current.x))
        shipPosRef.current.y = Math.max(0, Math.min(worldSizeRef.current.h - drawH, shipPosRef.current.y))

        // กล้องคงที่ (0,0) เพื่อให้เห็นทั้งแมพตลอดเวลา
        cameraRef.current.x = 0
        cameraRef.current.y = 0

        // วาดยานตามตำแหน่งสัมพัทธ์กล้อง (จอแสดงกลางเมื่อเคลื่อนในโลก)
        const dx = shipPosRef.current.x - cameraRef.current.x
        const dy = shipPosRef.current.y - cameraRef.current.y
        if (ctx) {
          ctx.drawImage(img, sx, sy, frameW, frameH, dx, dy, drawW, drawH)
        }
      }

      requestRef.current = requestAnimationFrame(loop)
    }

    img.decode().catch(() => void 0).finally(() => {
      last = performance.now()
      requestRef.current = requestAnimationFrame(loop)
    })

    return () => {
      isCancelled = true
      if (requestRef.current) cancelAnimationFrame(requestRef.current)
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <div className="w-full flex items-center justify-center py-8">
      <canvas ref={canvasRef} className="rounded-md shadow-md border border-neutral-800 touch-none select-none" />
    </div>
  )
}


