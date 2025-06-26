import "./BottomSection.css";
function BottomSection({ name, time }) {
  return (
    <div className="prayer">
      <p>{name}</p>
      <p>{time}</p>
    </div>
  );
}
export default BottomSection;
