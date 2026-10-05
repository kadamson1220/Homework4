export function showToast(message, type = "info") {
  const toastContainer = document.querySelector("#toastContainer");

  const toast = document.createElement("div");
  toast.classList.add("toast", `toast--${type}`);
  toast.innerHTML = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast--hide");
  }, 3000);

  setTimeout(() => {
    toast.remove();
  }, 3500);
}
