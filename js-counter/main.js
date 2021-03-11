let count = 0;
const countRef = document.getElementById("value");
const btns = document.querySelectorAll(".btn");

btns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const styles = e.currentTarget.classList;

    if (styles.contains("decrease")) {
      count--;
    } else if (styles.contains("increase")) {
      count++;
    } else {
      count = 0;
    }

    if (count < 0) {
      countRef.style.color = "red";
    } else if (count > 0) {
      countRef.style.color = "green";
    } else {
      countRef.style.color = "black";
    }
    countRef.innerText = count;
  });
});
