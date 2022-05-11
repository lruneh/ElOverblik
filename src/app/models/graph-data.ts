
export interface Graphs{
  data: GraphData[]
}
export interface GraphData {
  Address: string,
  MeteringPointType: string,
  points: GraphPoint[]
}

export interface GraphPoint{
  PointTime: Date,
  Amount: string
}

