export const scrollToBottom = (ref) => {
  setTimeout(() => {
    ref.current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  });
};
