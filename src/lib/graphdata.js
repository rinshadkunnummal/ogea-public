// List of batches
export const BATCHES = ["HIMA", "HIBA", "SWAFA", "SUHBA", "WAFD", "USWA"]

// List of months
export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

// Total batchwise data (for main chart)
export const totalBatchwiseData = [
  { batch: "HIMA", points: 1800 },
  { batch: "HIBA", points: 320 },
  { batch: "SWAFA", points: 1030 },
  { batch: "SUHBA", points: 710 },
  { batch: "WAFD", points: 630 },
  { batch: "USWA", points: 170 },
]

// Monthwise data - each month contains batch points
export const monthwiseData = {

  November: [
    { batch: "HIMA", points: 530 },
    { batch: "HIBA", points: 0 },
    { batch: "SWAFA", points: 100 },
    { batch: "SUHBA", points: 190 },
    { batch: "WAFD", points: 630 },
    { batch: "USWA", points: 80 },
  ],
  October: [
    { batch: "HIMA", points: 310 },
    { batch: "HIBA", points: 100 },
    { batch: "SWAFA", points: 120 },
    { batch: "SUHBA", points: 140 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
  September: [
    { batch: "HIMA", points: 390 },
    { batch: "HIBA", points: 140 },
    { batch: "SWAFA", points: 100 },
    { batch: "SUHBA", points: 150 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
  August: [
    { batch: "HIMA", points: 50 },
    { batch: "HIBA", points: 0 },
    { batch: "SWAFA", points: 90 },
    { batch: "SUHBA", points: 80 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
  July: [
    { batch: "HIMA", points: 240 },
    { batch: "HIBA", points: 20 },
    { batch: "SWAFA", points: 280 },
    { batch: "SUHBA", points: 100 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
  June: [
    { batch: "HIMA", points: 0 },
    { batch: "HIBA", points: 60 },
    { batch: "SWAFA", points: 180 },
    { batch: "SUHBA", points: 50 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 90 },
  ],
  May: [
    { batch: "HIMA", points: 160 },
    { batch: "HIBA", points: 0 },
    { batch: "SWAFA", points: 120 },
    { batch: "SUHBA", points: 0 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
  April: [
    { batch: "HIMA", points: 120 },
    { batch: "HIBA", points: 0 },
    { batch: "SWAFA", points: 40 },
    { batch: "SUHBA", points: 0 },
    { batch: "WAFD", points: 0 },
    { batch: "USWA", points: 0 },
  ],
}

// Chart configuration
export const chartConfig = {
  points: {
    label: "Points",
    color: "var(--chart-1)",
  },
}