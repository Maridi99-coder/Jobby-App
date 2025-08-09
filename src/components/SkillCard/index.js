import './index.css'

const SkillCard = props => {
  const {skilldetails} = props
  const {imageUrl, name} = skilldetails

  return (
    <li className="skillitem">
      <img src={imageUrl} className="skillimg" alt={name} />
      <p className="skillname">{name}</p>
    </li>
  )
}
export default SkillCard
