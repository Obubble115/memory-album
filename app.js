const storageKey = "personal-memory-album-v1";

const form = document.querySelector("#memoryForm");
const photoInput = document.querySelector("#photoInput");
const photoPreview = document.querySelector("#photoPreview");
const albumGrid = document.querySelector("#albumGrid");
const emptyState = document.querySelector("#emptyState");
const filterButtons = document.querySelectorAll("[data-filter]");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxMeta = document.querySelector("#lightboxMeta");
const lightboxNote = document.querySelector("#lightboxNote");
const closeLightbox = document.querySelector("#closeLightbox");
const deleteMemory = document.querySelector("#deleteMemory");
const exportData = document.querySelector("#exportData");
const themeToggle = document.querySelector("#themeToggle");

let memories = loadMemories();
let activeFilter = "全部";
let selectedMemoryId = null;
let currentPhotoData = "";

initializeAlbum();
restoreTheme();

photoInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  try {
    currentPhotoData = await resizeImageFile(file);
    photoPreview.src = currentPhotoData;
    photoPreview.hidden = false;
  } catch {
    alert("这张图片暂时无法读取，请换一张试试。");
    photoInput.value = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!currentPhotoData) {
    photoInput.focus();
    return;
  }

  const memory = {
    id: crypto.randomUUID(),
    title: document.querySelector("#memoryTitle").value.trim(),
    date: document.querySelector("#memoryDate").value,
    place: document.querySelector("#memoryPlace").value.trim(),
    category: document.querySelector("#memoryCategory").value,
    note: document.querySelector("#memoryNote").value.trim(),
    image: currentPhotoData,
    createdAt: new Date().toISOString(),
  };

  memories = [memory, ...memories];
  try {
    saveMemories();
    renderAlbum();
    form.reset();
    photoPreview.hidden = true;
    photoPreview.removeAttribute("src");
    currentPhotoData = "";
    document.querySelector("#album").scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    memories = memories.filter((item) => item.id !== memory.id);
    alert("浏览器本地空间不够了。可以先导出备份，或删除一些旧照片后再添加。");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    renderAlbum();
  });
});

closeLightbox.addEventListener("click", () => lightbox.close());

deleteMemory.addEventListener("click", () => {
  if (!selectedMemoryId) return;
  const ok = confirm("确定删除这段回忆吗？删除后无法恢复。");
  if (!ok) return;

  memories = memories.filter((memory) => memory.id !== selectedMemoryId);
  saveMemories();
  selectedMemoryId = null;
  lightbox.close();
  renderAlbum();
});

exportData.addEventListener("click", () => {
  const payload = JSON.stringify(memories, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `我的图集纪念册-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

themeToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  localStorage.setItem("memory-album-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
});

function renderAlbum() {
  const filtered = activeFilter === "全部"
    ? memories
    : memories.filter((memory) => memory.category === activeFilter);

  albumGrid.innerHTML = "";
  emptyState.hidden = filtered.length > 0;

  filtered.forEach((memory) => {
    const card = document.createElement("article");
    card.className = "memory-card";
    card.innerHTML = `
      <button type="button" aria-label="查看：${escapeHtml(memory.title)}">
        <img src="${memory.image}" alt="${escapeHtml(memory.title)}" loading="lazy" />
        <div class="card-copy">
          <div class="card-meta">
            <span>${escapeHtml(formatDate(memory.date))}</span>
            <span>${escapeHtml(memory.category)}</span>
            ${memory.place ? `<span>${escapeHtml(memory.place)}</span>` : ""}
          </div>
          <h3>${escapeHtml(memory.title)}</h3>
          <p>${escapeHtml(memory.note || "没有写说明，但这张照片已经说明了很多。")}</p>
        </div>
      </button>
    `;

    card.querySelector("button").addEventListener("click", () => openMemory(memory.id));
    albumGrid.append(card);
  });
}

async function initializeAlbum() {
  if (memories.length === 0) {
    memories = await loadPublicAlbumData();
  }
  renderAlbum();
}

function openMemory(id) {
  const memory = memories.find((item) => item.id === id);
  if (!memory) return;

  selectedMemoryId = id;
  lightboxImage.src = memory.image;
  lightboxImage.alt = memory.title;
  lightboxTitle.textContent = memory.title;
  lightboxMeta.textContent = [formatDate(memory.date), memory.category, memory.place]
    .filter(Boolean)
    .join(" · ");
  lightboxNote.textContent = memory.note || "没有写说明，但这张照片已经说明了很多。";
  lightbox.showModal();
}

function resizeImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const maxSize = 1600;
        const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
        const width = Math.round(image.width * ratio);
        const height = Math.round(image.height * ratio);
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      image.onerror = reject;
      image.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadMemories() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch {
    return [];
  }
}

async function loadPublicAlbumData() {
  try {
    const response = await fetch("album-data.json", { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function saveMemories() {
  localStorage.setItem(storageKey, JSON.stringify(memories));
}

function restoreTheme() {
  const theme = localStorage.getItem("memory-album-theme");
  if (theme === "dark") document.documentElement.classList.add("dark");
}

function formatDate(value) {
  if (!value) return "未填写日期";
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
