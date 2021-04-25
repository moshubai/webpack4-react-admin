export const relativePositionJudge = (cur, box, isDrop, direction) => {
  const rect = box.getBoundingClientRect()
  let offset = null
  if (direction) {
    offset = {
      x: rect.width / 2,
      y: 0,
    }
  } else {
    offset = {
      x: 0,
      y: isDrop ? rect.height / 4 : rect.height / 2,
    }
  }
  const point = {
    x: cur.clientX,
    y: cur.clientY,
  }
  // up
  const rect1 = {
    x: rect.x + offset.x,
    y: rect.y,
    w: rect.width - (offset.x * 2),
    h: offset.y,
  }
  // down
  const rect2 = {
    x: rect.x + offset.x,
    y: (rect.y + rect.height) - offset.y,
    w: rect.width - (offset.x * 2),
    h: offset.y,
  }
  // inside
  const rect3 = {
    x: rect.x + offset.x,
    y: rect.y + offset.y,
    w: rect.width - (offset.x * 2),
    h: rect.height - (offset.y * 2),
  }
  // front
  const rect4 = {
    x: rect.x,
    y: rect.y,
    w: offset.x,
    h: rect.height,
  }
  // behind
  const rect5 = {
    x: rect.x + rect.width - offset.x,
    y: rect.y,
    w: offset.x,
    h: rect.height,
  }
  let pos = null
  if (pointInRect(point, rect1)) pos = 'up'
  if (pointInRect(point, rect2)) pos = 'down'
  if (pointInRect(point, rect3)) pos = 'inside'
  if (pointInRect(point, rect4)) pos = 'front'
  if (pointInRect(point, rect5)) pos = 'behind'
  return pos
}

const pointInRect = (point, rect) => {
  return point.x >= rect.x && point.y >= rect.y && point.x <= rect.x + rect.w && point.y <= rect.y + rect.h
}
