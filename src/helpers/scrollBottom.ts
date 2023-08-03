export const scrollToBottom = (refDisplay : any) => {
  const chatDisplay = refDisplay?.current;
  chatDisplay.scrollTop = chatDisplay.scrollHeight;
};

export  const scrollToElement = (elementId: string) => {

  if (elementId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};