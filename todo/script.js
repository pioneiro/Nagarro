const defaultList = [
  {
    title: "Code",
    done: false,
  },
  {
    title: "Practice Piano",
    done: true,
  },
];

const todo = JSON.parse(localStorage.getItem("todo")) || defaultList;

const item = ({ title, done = false }) => `
<li class="my-4 flex items-center justify-center gap-4">
  <span id="task" class="inline-block w-4/5 cursor-pointer select-none ${
    done && "line-through"
  }"
    >${title}</span
  >
  <button
    id="delete"
    class="w-1/5 text-red-800 grid place-items-center"
  >
    <svg
      class="p-2 bg-red-200 aspect-square rounded-xl"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      class="bi bi-trash3-fill"
      viewBox="0 0 16 16"
    >
      <path
        d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"
      />
    </svg>
  </button>
</li>`;

$(document).ready(() => {
  $("body").show();

  // populate the list
  todo.map((e) => {
    $("#list").append(item(e));
  });

  // add item to the list
  $("#form").on("submit", function (e) {
    e.preventDefault();

    const value = $("#input").val();

    if (!value) {
      $("#form").addClass("shake");

      setTimeout(() => $("#form").removeClass("shake"), 500);

      return;
    }

    todo.push({ title: value, done: false });
    localStorage.setItem("todo", JSON.stringify(todo));

    $("#list").append(item({ title: value, done: false }));
    $("#input").val("");
  });

  // mark as done
  $("#list").on("click", "#task", function () {
    const index = $(this).parent().index();
    todo[index].done = !todo[index].done;
    localStorage.setItem("todo", JSON.stringify(todo));

    $(this).toggleClass("line-through");
  });

  // delete
  $("#list").on("click", "#delete", function () {
    const index = $(this).parent().index();
    todo.splice(index, 1);
    localStorage.setItem("todo", JSON.stringify(todo));

    $(this.parentElement).remove();
  });
});
