const blockAdditionalButtons = () => {
  const additionalButtons = document.getElementById("additional-buttons");
  additionalButtons.querySelectorAll("button").forEach((btn) => btn.classList.add("btn-disabled"));
};


export { blockAdditionalButtons};
