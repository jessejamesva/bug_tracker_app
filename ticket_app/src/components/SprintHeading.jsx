export default function SprintHeading(props) {
    const { sprint, isSprintLoaded } = props

    if (!isSprintLoaded) {
        return null
    }

    return (
      <div className="flex mt-4 bg-pink-100 h-20 w-full justify-around align-middle py-4">
        <h2 className="my-auto text-4xl font-bold">Sprint: {sprint.name}</h2>
        <div>
          <h3>{`Start date: ${sprint.start_date}`}</h3>
          <h3>{`End date: ${sprint.end_date}`}</h3>
        </div>
      </div>
    )
}