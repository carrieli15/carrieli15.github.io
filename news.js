const newsItems = [
  {
    date: "Oct 7, 2026",
    tag: "grant",
    text: "I received a University of Rochester River Campus Libraries Dataset Grant in support of my research!",
  },
  {
    date: "Sep 24, 2026",
    tag: "paper",
    text: "My co-first-author paper has been accepted to the NeurIPS 2026 Position Paper Track!",
  },
  {
    date: "Sep 03, 2026",
    text: "I have officially started my PhD at the Warner School of Education, University of Rochester, and have also begun my research assistantship.",
  },
  {
    date: "May 26, 2026",
    text: "Our project <em>Aligned Machine</em> is selected to give a talk as one of the top 6 abstracts submitted to the Ethics and Agentic AI Symposium, hosted at NC State University.",
  },
  {
    date: "April 16, 2026",
    text: "Dr. Bent and I shared the TRUST Lab's work with audiences of all ages at the Illuminating Science Outreach event at the NC Museum of Natural Sciences",
  },
  {
    date: "Feb 14, 2026",
    text: "I gave a rapid-fire talk and presented a poster at the Conference on Society-Centered AI at Duke University.",
  },
  {
    date: "Dec 4, 2025",
    text: "I presented an accepted poster at the Women in Machine Learning (WiML) Workshop at NeurIPS 2025.",
  },
  {
    date: "Nov 10, 2025",
    tag: "grant",
    text: "I received a Travel Award to attend the Women in Machine Learning (WiML) Workshop at NeurIPS 2025.",
  },
  {
    date: "April 18, 2024",
    tag: "award",
    text: "Our AI companion robot project was named a Global Semi-Finalist in Microsoft’s Imagine Cup 2024.",
  },
  {
    date: "Feb 28, 2024",
    tag: "grant",
    text: "I received the Dean’s Research Award for Master’s Students Fellowship at Duke University for the 2024–2025 academic year.",
  },
  {
    date: "Nov 05, 2023",
    tag: "award",
    text: "Our project <a href=\"https://github.com/TalkWithMe-Duke-Hackathon/Team49_Rock_the_Hackathon\" target=\"_blank\" rel=\"noreferrer\"><em>TalkWithMe</em></a>, an AI language-learning product, received the Beginner Award at the Generative AI Hackathon at Duke University.",
  },
  {
    date: "Sep 1, 2023",
    tag: "grant",
    text: "I received the Master of Interdisciplinary Data Science (MIDS) Scholarship at Duke University for 2023–2025.",
  },
  {
    date: "Aug 07, 2023",
    text: "I started my second master’s program, the Master of Interdisciplinary Data Science (MIDS), at Duke University.",
  },
];

const newsPerPage = 5;
let currentNewsPage = 1;

function getPaginationItems(pageCount, currentPage) {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const items = [1];
  let start = Math.max(2, currentPage - 1);
  let end = Math.min(pageCount - 1, currentPage + 1);

  if (currentPage <= 3) {
    start = 2;
    end = 4;
  }

  if (currentPage >= pageCount - 2) {
    start = pageCount - 3;
    end = pageCount - 1;
  }

  if (start > 2) {
    items.push("ellipsis");
  }

  for (let page = start; page <= end; page += 1) {
    items.push(page);
  }

  if (end < pageCount - 1) {
    items.push("ellipsis");
  }

  items.push(pageCount);
  return items;
}

function renderNews() {
  const container = document.getElementById("news-list");
  const pagination = document.getElementById("news-pagination");
  if (!container) return;

  const pageCount = Math.ceil(newsItems.length / newsPerPage);
  const startIndex = (currentNewsPage - 1) * newsPerPage;
  const visibleItems = newsItems.slice(startIndex, startIndex + newsPerPage);

  container.innerHTML = visibleItems
    .map(
      (item) => `
        <li class="news-item">
          <div class="news-date">${item.date}</div>
          <div class="news-text">
            ${item.text}
            ${item.tag ? `<span class="news-tag news-tag-${item.tag}">${item.tag}</span>` : ""}
          </div>
        </li>
      `,
    )
    .join("");

  if (!pagination) return;

  const shouldShowPagination = pageCount > 1;
  pagination.hidden = !shouldShowPagination;
  if (!shouldShowPagination) return;

  pagination.innerHTML = getPaginationItems(pageCount, currentNewsPage).map((item) => {
    if (item === "ellipsis") {
      return `<span class="news-page-ellipsis" aria-hidden="true">...</span>`;
    }

    const page = item;
    const isCurrent = page === currentNewsPage;

    return `
      <button
        class="news-page-button"
        type="button"
        data-page="${page}"
        ${isCurrent ? 'aria-current="page"' : ""}
      >
        ${page}
      </button>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  const pagination = document.getElementById("news-pagination");

  if (pagination) {
    pagination.addEventListener("click", (event) => {
      const button = event.target.closest("[data-page]");
      if (!button) return;

      currentNewsPage = Number(button.dataset.page);
      renderNews();
    });
  }

  renderNews();
});
