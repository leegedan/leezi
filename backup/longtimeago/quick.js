function Quick(array, low = 0, high = array.length - 1) {
  if (low >= high) return // 出口

  let i = low
  let j = high
  let key = array[low]

  while (i < j) {
    while (key < array[j]) j--
    array[i] = array[j]

    while (key >= array[i] && i < j) i++
    array[j] = array[i]
  }
  array[i] = key

  Quick(array, low, i - 1)
  Quick(array, i + 1, high)
}
