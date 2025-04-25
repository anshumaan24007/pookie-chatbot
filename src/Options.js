const Options = ({ options, handleOptions, header, back }) => {
  return (
    <>
      <div className="header">{header}</div>
      <div className="option-container">
        {options.map((option, idx) => (
          <div
            className="click-options"
            key={idx}
            onClick={() => handleOptions(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </>
  );
};

export default Options;
