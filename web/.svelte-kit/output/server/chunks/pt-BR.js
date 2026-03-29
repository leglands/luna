const app = { "name": "Luna", "tagline": "Seu ciclo, compreendido" };
const phases = { "menstrual": "Menstrual", "follicular": "Folicular", "ovulation": "Ovulação", "luteal": "Luteal" };
const privacy = { "badge": "Privado e Criptografado", "disclaimer": "Esta informação não substitui o aconselhamento médico profissional. Sempre consulte um profissional de saúde qualificado para preocupações médicas." };
const settings = { "title": "Configurações", "cycleLength": "Duração do Ciclo", "periodLength": "Duração do Período", "lastPeriod": "Data da Última Menstruação", "save": "Salvar", "saved": "Configurações salvas" };
const ptBR = {
  app,
  phases,
  privacy,
  settings
};
export {
  app,
  ptBR as default,
  phases,
  privacy,
  settings
};
