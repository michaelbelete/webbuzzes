import getBoundaries from "../utils/getBoundaries"

function getArea({ width, height }) {
  return width * height
}

/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 * @method
 * @memberof Popper.Utils
 * @argument {Object} data - The data object generated by update method
 * @argument {Object} options - Modifiers configuration and options
 * @returns {Object} The data object, properly modified
 */
export default function computeAutoPlacement(
  placement,
  refRect,
  popper,
  reference,
  boundariesElement,
  padding = 0
) {
  if (placement.indexOf("auto") === -1) {
    return placement
  }

  const boundaries = getBoundaries(
    popper,
    reference,
    padding,
    boundariesElement
  )

  const rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top,
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height,
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom,
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height,
    },
  }

  const sortedAreas = Object.keys(rects)
    .map((key) => ({
      key,
      ...rects[key],
      area: getArea(rects[key]),
    }))
    .sort((a, b) => b.area - a.area)

  const filteredAreas = sortedAreas.filter(
    ({ width, height }) =>
      width >= popper.clientWidth && height >= popper.clientHeight
  )

  const computedPlacement =
    filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key

  const variation = placement.split("-")[1]

  return computedPlacement + (variation ? `-${variation}` : "")
}