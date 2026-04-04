const app = { "name": "Luna", "tagline": "Seu ciclo, compreendido" };
const phases = { "menstrual": "Menstrual", "follicular": "Folicular", "ovulation": "Ovulação", "luteal": "Luteal" };
const privacy = { "badge": "Privado e Criptografado", "disclaimer": "Esta informação não substitui o aconselhamento médico profissional. Sempre consulte um profissional de saúde qualificado para preocupações médicas." };
const settings = { "title": "Configurações", "cycleLength": "Duração do Ciclo", "periodLength": "Duração do Período", "lastPeriod": "Data da Última Menstruação", "save": "Salvar", "saved": "Configurações salvas" };
const contact = { "title": "Fale conosco", "close": "Fechar", "back": "Voltar", "send": "Enviar", "messageAriaLabel": "Sua mensagem", "sentTitle": "Mensagem enviada!", "sentBody": "Obrigado, lemos cada mensagem.", "typeImprovement": "Melhoria", "typeFeedback": "Feedback", "typeBug": "Bug", "placeholderImprovement": "Seria ótimo se…", "placeholderFeedback": "Sua opinião importa…", "placeholderBug": "Quando faço… acontece…" };
const ptBR = {
  app,
  phases,
  privacy,
  settings,
  contact
};
export {
  app,
  contact,
  ptBR as default,
  phases,
  privacy,
  settings
};
