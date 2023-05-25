import './Switch.css'

const Switch = ({ isOn, handleToggle, disabled = false, id }: { isOn: boolean, handleToggle: () => void, disabled?: boolean, id: string }) => {
  return (
    <div style={{position: 'relative'}} className='prevent-select'>
      <input
        checked={isOn}
        style={{position: 'absolute'}}
        onChange={handleToggle}
        className="react-switch-checkbox prevent-select"
        id={`react-switch-new-${id}`}
        type="checkbox"
        disabled={disabled}
      />
      <label
        style={{ backgroundColor: isOn ? 'var(--primary)' : '' }}
        className="react-switch-label prevent-select"
        htmlFor={`react-switch-new-${id}`}
      >
        <span className={`react-switch-button prevent-select`} />
      </label>
    </div>
  );
};

export default Switch;
