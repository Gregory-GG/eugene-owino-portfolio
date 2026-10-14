import useCountUp from '../hooks/useCountUp.js';

export default function ImpactStat({ metric }) {
  const [ref, display] = useCountUp(metric.value);
  return (
    <div className="impact-item">
      <dt className="visually-hidden">{metric.label}</dt>
      <dd className="impact-value font-heading" ref={ref} aria-label={metric.value}>
        {display}
      </dd>
      <dd className="impact-label">{metric.label}</dd>
      <dd className="impact-source">{metric.source}</dd>
    </div>
  );
}
