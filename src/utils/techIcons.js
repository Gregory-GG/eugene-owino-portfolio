// Technology logos for skills, tech stacks and certification issuers.
// Simple Icons (CC0) where available; Font Awesome brands for Microsoft/Azure.
import {
  siPython, siGo, siOpenjdk, siTypescript, siJavascript, siPostgresql, siCplusplus, siGnubash, siRust,
  siPytorch, siHuggingface, siLangchain, siScikitlearn, siPandas, siMlflow, siWeightsandbiases, siRay,
  siApacheairflow, siDbt, siAmazonwebservices, siGooglecloud, siKubernetes, siDocker, siTerraform,
  siGithubactions, siApachekafka, siRedis, siPrometheus, siGrafana, siOpentelemetry, siFastapi,
  siSpringboot, siDatabricks, siCncf, siReact, siPytest,
} from 'simple-icons';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';

const si = (icon) => ({ type: 'si', path: icon.path, hex: `#${icon.hex}`, title: icon.title });
const fa = (icon, hex) => ({ type: 'fa', icon, hex });

// Keys are matched case-insensitively against skill and tech names in db.json.
const MAP = {
  python: si(siPython),
  go: si(siGo),
  java: si(siOpenjdk),
  typescript: si(siTypescript),
  javascript: si(siJavascript),
  sql: si(siPostgresql),
  'c++': si(siCplusplus),
  bash: si(siGnubash),
  rust: si(siRust),
  pytorch: si(siPytorch),
  'hugging face': si(siHuggingface),
  'hugging face transformers': si(siHuggingface),
  langchain: si(siLangchain),
  'scikit-learn': si(siScikitlearn),
  pandas: si(siPandas),
  mlflow: si(siMlflow),
  'weights & biases': si(siWeightsandbiases),
  ray: si(siRay),
  airflow: si(siApacheairflow),
  dbt: si(siDbt),
  aws: si(siAmazonwebservices),
  gcp: si(siGooglecloud),
  azure: fa(faMicrosoft, '#0078D4'),
  kubernetes: si(siKubernetes),
  docker: si(siDocker),
  terraform: si(siTerraform),
  'github actions': si(siGithubactions),
  kafka: si(siApachekafka),
  postgresql: si(siPostgresql),
  redis: si(siRedis),
  prometheus: si(siPrometheus),
  grafana: si(siGrafana),
  opentelemetry: si(siOpentelemetry),
  fastapi: si(siFastapi),
  'spring boot': si(siSpringboot),
  databricks: si(siDatabricks),
  cncf: si(siCncf),
  react: si(siReact),
  pytest: si(siPytest),
};

export function techIcon(name) {
  if (!name) return null;
  const key = name.toLowerCase().replace(/\s*\(.*\)$/, '').trim();
  return MAP[key] || null;
}

/** Logos shown in the scrolling strip on the Home page. */
export const MARQUEE = [
  'Python', 'Go', 'Java', 'TypeScript', 'PyTorch', 'Hugging Face', 'LangChain', 'MLflow', 'Kubernetes',
  'Terraform', 'Kafka', 'PostgreSQL', 'AWS', 'GCP', 'Azure', 'Docker', 'FastAPI', 'Grafana', 'Airflow', 'Rust',
];
