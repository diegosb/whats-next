export interface RecommendationsCardProps {
  title: string
  description: string
}

export default function RecommendationCard(props: RecommendationsCardProps) {
  return (
    <div className="flex flex-col z-40 justify-between border-slate-200 border p-4">
      <h3 className="font-bold text-indigo-500 text-3xl mb-2">{props.title}</h3>
      <p className="text-slate-600 mb-4 text-lg">{props.description}</p>
    </div>
  )
}
