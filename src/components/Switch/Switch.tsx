import './Switch.css'

const Switch = ({ isOn, handleToggle }: { isOn: boolean, handleToggle: () => void }) => {
  return (
    <div style={{position: 'relative'}}>
      <input
        checked={isOn}
        style={{position: 'absolute'}}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
      />
      <label
        style={{ backgroundColor: isOn ? 'var(--primary)' : '' }}
        className="react-switch-label"
        htmlFor={`react-switch-new`}
      >
        <span className={`react-switch-button`} />
      </label>
    </div>
  );
};

export default Switch;
