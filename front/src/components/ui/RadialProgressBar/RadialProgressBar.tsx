type Props = {
  sqSize: number;
  percentage: number;
  strokeWidth: number;
  color: string;
  textSize?: number;
};

const RadialProgressBar = (props: Props) => {
  // Size of the enclosing square
  const sqSize = props.sqSize;
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  const radius = (props.sqSize - props.strokeWidth) / 2;
  // Enclose cicle in a circumscribing square
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  // Arc length at 100% coverage is the circle circumference
  const dashArray = radius * Math.PI * 2;
  // Scale 100% coverage overlay with the actual percent
  const dashOffset = dashArray - (dashArray * props.percentage) / 100;

  return (
    <svg
      width={props.sqSize + 10}
      height={props.sqSize + 10}
      viewBox={viewBox}
      className="overflow-visible"
    >
      <defs>
        <filter id="shadow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={"black"} />
        </filter>
        <filter id="shadow2">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="cyan" />
        </filter>
        <filter id="shadow3">
          <feDropShadow
            dx="-0.8"
            dy="-0.8"
            stdDeviation="0"
            floodColor="pink"
            floodOpacity="0.5"
          />
        </filter>
      </defs>

      <circle
        className="stroke-gray-900 fill-gray-900 shadow-md shadow-black"
        cx={props.sqSize / 2}
        cy={props.sqSize / 2}
        r={radius + 2}
        strokeWidth={4}
        filter="url(#shadow)"
      />
      <circle
        className="stroke-gray-600 fill-none"
        cx={props.sqSize / 2}
        cy={props.sqSize / 2}
        r={radius}
        filter="url(#shadow)"
        strokeWidth={`${props.strokeWidth}px`}
      />
      <circle
        className="fill-none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        cx={props.sqSize / 2}
        filter="url(#shadow)"
        cy={props.sqSize / 2}
        r={radius}
        strokeWidth={`${props.strokeWidth}px`}
        transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
        style={{
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      <text
        className="circle-text"
        fontSize={props.textSize + "rem"}
        fill={"#fff"}
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        filter="url(#shadow)"
      >
        {`${Math.floor(props.percentage)}%`}
      </text>
    </svg>
  );
};

export default RadialProgressBar;
