// Handle search queries on the website.

window.addEventListener("DOMContentLoaded", function (event) {
  const form = document.getElementById("header-search");
  const input = document.getElementById("header-search-input") as HTMLInputElement;
  const clear = document.getElementById("header-search-clear");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    let term = input.value.trim();
    if (!term) {
      return;
    }

    // Modified from
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
    function fixedEncodeURIComponent(str) {
      return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      }).replace(/%20/g, "+");
    }

    window.location.href = "/search?q=" + fixedEncodeURIComponent(term);
  }, false);

  input.addEventListener("focusin", function (event) {
    input.classList.replace("w-0", "w-80");
    input.classList.replace("m-0", "ml-2");
    clear.classList.remove("hidden");
  });

  input.addEventListener("focusout", function (event) {
    if (input.value.length == 0) {
      input.classList.replace("w-80", "w-0");
      input.classList.replace("ml-2", "m-0");
      clear.classList.add("hidden");
    }
  });

  input.addEventListener("input", function (event) {
    if (input.value.length > 0) {
      clear.classList.remove("invisible");
    } else {
      clear.classList.add("invisible");
    }
  });

  clear.addEventListener("click", function (event) {
    input.focus();
    clear.classList.add("invisible");
  })
});
