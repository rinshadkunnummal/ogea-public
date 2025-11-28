// List of batches
export const BATCHES = ["HIMA", "HIBA", "SWAFA", "SUHBA", "WAFD", "USWA"]

// List of months
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Total batchwise data (for main chart)
export const totalBatchwiseData = [
  { batch: "HIMA", points: 186 },
  { batch: "HIBA", points: 305 },
  { batch: "SWAFA", points: 237 },
  { batch: "SUHBA", points: 73 },
  { batch: "WAFD", points: 209 },
  { batch: "USWA", points: 214 },
]

// Monthwise data - each month contains batch points
export const monthwiseData = {
  January: [
    { batch: "HIMA", points: 4 },
    { batch: "HIBA", points: 2 },
    { batch: "SWAFA", points: 2 },
    { batch: "SUHBA", points: 40 },
    { batch: "WAFD", points: 24 },
    { batch: "USWA", points: 50 },
  ],
  February: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 14 },
    { batch: "SWAFA", points: 14 },
    { batch: "SUHBA", points: 14 },
    { batch: "WAFD", points: 14 },
    { batch: "USWA", points: 15 },
  ],
  March: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  April: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  May: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  June: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  July: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  August: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  September: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 121 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  October: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  November: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
  December: [
    { batch: "HIMA", points: 14 },
    { batch: "HIBA", points: 15 },
    { batch: "SWAFA", points: 42 },
    { batch: "SUHBA", points: 11 },
    { batch: "WAFD", points: 13 },
    { batch: "USWA", points: 21 },
  ],
}

// Chart configuration
export const chartConfig = {
  points: {
    label: "Points",
    color: "var(--chart-1)",
  },
}