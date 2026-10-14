import {
  faLayerGroup,
  faScaleBalanced,
  faShieldHalved,
  faMoneyBillTransfer,
  faServer,
  faListCheck,
  faChartColumn,
  faFlask,
  faCode,
} from '@fortawesome/free-solid-svg-icons';

// Icons are stored in db.json by Font Awesome name. Add new ones here.
const icons = {
  'layer-group': faLayerGroup,
  'scale-balanced': faScaleBalanced,
  'shield-halved': faShieldHalved,
  'money-bill-transfer': faMoneyBillTransfer,
  server: faServer,
  'list-check': faListCheck,
  'chart-column': faChartColumn,
  flask: faFlask,
};

export function iconFor(name) {
  return icons[name] || faCode;
}
