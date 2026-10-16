// Beauty Video Gallery JavaScript
const videoData = [
  {
    id: "clip-1",
    title: "Beauty Clip #01 — 今、顔のどこに",
    src: "893515C254C5899666E42B6861C695FD8AA55980.mp4",
    thumbnail: "thumbnails/893515C254C5899666E42B6861C695FD8AA55980.mp4.png",
    duration: 17.81,
    formattedDuration: "0:18",
    size: 3439828,
    formattedSize: "3.3 MB",
    resolution: "720 × 1280"
  },
  {
    id: "clip-2",
    title: "Beauty Clip #02 — どんな感覚を体験する？",
    src: "9B3C8AD3262B574A35F4CD4A9255C53948F3B93C.mp4",
    thumbnail: "thumbnails/9B3C8AD3262B574A35F4CD4A9255C53948F3B93C.mp4.png",
    duration: 23.51,
    formattedDuration: "0:24",
    size: 5561648,
    formattedSize: "5.3 MB",
    resolution: "720 × 1280"
  },
  {
    id: "clip-3",
    title: "Beauty Clip #03 — 顔に触れる4つの動き",
    src: "1E970E02DAB01C236D0B5EAF8625BF76E79C22DE.mp4",
    thumbnail: "thumbnails/1E970E02DAB01C236D0B5EAF8625BF76E79C22DE.mp4.png",
    duration: 24.73,
    formattedDuration: "0:25",
    size: 5446828,
    formattedSize: "5.2 MB",
    resolution: "720 × 1280"
  },
  {
    id: "clip-4",
    title: "Beauty Clip #04 — 全身、やらなくてOK",
    src: "C1739FE29A7C170FBA3FE3F1B6D55A79541AD1A1.mp4",
    thumbnail: "thumbnails/C1739FE29A7C170FBA3FE3F1B6D55A79541AD1A1.mp4.png",
    duration: 28.84,
    formattedDuration: "0:29",
    size: 8038451,
    formattedSize: "7.7 MB",
    resolution: "720 × 1280"
  },
  {
    id: "clip-5",
    title: "Beauty Clip #05 — 肩甲骨に余白を",
    src: "49F2E83F21953654E85D27A0799EEFF1B8BF97C7.mp4",
    thumbnail: "thumbnails/49F2E83F21953654E85D27A0799EEFF1B8BF97C7.mp4.png",
    duration: 29.99,
    formattedDuration: "0:30",
    size: 7442741,
    formattedSize: "7.1 MB",
    resolution: "720 × 1280"
  },
  {
    id: "clip-6",
    title: "Beauty Clip #06 — 明日、あの人に会う",
    src: "A03ABBADECBFAD7CF3BEE6C4CCC31ADBD1817A1B.mp4",
    thumbnail: "thumbnails/A03ABBADECBFAD7CF3BEE6C4CCC31ADBD1817A1B.mp4.png",
    duration: 35.22,
    formattedDuration: "0:35",
    size: 6802646,
    formattedSize: "6.5 MB",
    resolution: "720 × 1280"
  }
];

let currentVideos = [...videoData];
let currentModalIndex = -1;

// Elements
const gridContainer = document.getElementById("video-grid");
const feedContainer = document.getElementById("feed-container");
const sortSelect = document.getElementById("sort-select");
const tabGrid = document.getElementById("tab-grid");
const tabFeed = document.getElementById("tab-feed");
const gridView = document.getElementById("grid-view");
const feedView = document.getElementById("feed-view");
const videoCountSpan = document.getElementById("video-count");

// Modal Elements
const modal = document.getElementById("video-modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");
const modalVideo = document.getElementById("modal-video");
const modalPlayOverlay = document.getElementById("modal-play-overlay");
const modalTitle = document.getElementById("modal-title");
const modalSpecs = document.getElementById("modal-specs");
const modalDownload = document.getElementById("modal-download");

// Controls Elements
const ctrlPlay = document.getElementById("ctrl-play");
const iconPlay = document.getElementById("icon-play");
const iconPause = document.getElementById("icon-pause");
const ctrlMute = document.getElementById("ctrl-mute");
const iconVolume = document.getElementById("icon-volume");
const iconMuted = document.getElementById("icon-muted");
const ctrlLoop = document.getElementById("ctrl-loop");
const ctrlSpeed = document.getElementById("ctrl-speed");
const ctrlFullscreen = document.getElementById("ctrl-fullscreen");
const currentTimeEl = document.getElementById("current-time");
const totalTimeEl = document.getElementById("total-time");
const progressContainer = document.getElementById("progress-container");
const progressPlayed = document.getElementById("progress-played");
const progressBuffer = document.getElementById("progress-buffer");

// Format seconds into MM:SS
function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Render Grid
function renderGrid() {
  gridContainer.innerHTML = "";
  videoCountSpan.textContent = `${currentVideos.length} 本の動画`;

  currentVideos.forEach((video, index) => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${video.title} を再生`);

    card.innerHTML = `
      <div class="video-card-media">
        <span class="card-badge quality-badge">HD</span>
        <span class="card-badge duration-badge">${video.formattedDuration}</span>
        <img src="${video.thumbnail}" alt="${video.title} サムネイル" loading="lazy">
        <video muted loop playsinline preload="none"></video>
        <div class="play-hint-overlay">
          <div class="play-hint-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div class="video-card-body">
        <h2 class="video-card-title">${video.title}</h2>
        <div class="video-card-meta">
          <span>${video.formattedSize} • 9:16</span>
          <span class="video-hash" title="${video.src}">${video.src}</span>
        </div>
      </div>
    `;

    const mediaContainer = card.querySelector(".video-card-media");
    const previewVideo = card.querySelector("video");

    let hoverTimeout = null;

    // Hover preview logic
    card.addEventListener("mouseenter", () => {
      hoverTimeout = setTimeout(() => {
        if (!previewVideo.src) {
          previewVideo.src = video.src;
        }
        card.classList.add("previewing");
        previewVideo.play().catch(() => {});
      }, 150);
    });

    card.addEventListener("mouseleave", () => {
      clearTimeout(hoverTimeout);
      card.classList.remove("previewing");
      if (previewVideo.src) {
        previewVideo.pause();
        previewVideo.currentTime = 0;
      }
    });

    // Click to open modal
    card.addEventListener("click", () => {
      openModal(index);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(index);
      }
    });

    gridContainer.appendChild(card);
  });
}

// Render Feed (Shorts/Reels)
function renderFeed() {
  feedContainer.innerHTML = "";

  currentVideos.forEach((video, index) => {
    const item = document.createElement("div");
    item.className = "feed-item";
    item.dataset.index = index;

    item.innerHTML = `
      <video class="feed-video" src="${video.src}" poster="${video.thumbnail}" loop playsinline preload="metadata"></video>
      <div class="feed-overlay">
        <div class="feed-info">
          <h3 class="feed-title">${video.title}</h3>
          <p class="feed-meta">${video.formattedDuration} • ${video.formattedSize} • ${video.resolution}</p>
        </div>
        <div class="feed-side-actions">
          <button class="feed-action-btn feed-mute-btn" aria-label="ミュート切替">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          </button>
          <a class="feed-action-btn" href="${video.src}" download="${video.title}.mp4" aria-label="ダウンロード">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </a>
        </div>
      </div>
    `;

    const vid = item.querySelector(".feed-video");
    const muteBtn = item.querySelector(".feed-mute-btn");

    vid.muted = true;

    vid.addEventListener("click", () => {
      if (vid.paused) {
        vid.play();
      } else {
        vid.pause();
      }
    });

    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      vid.muted = !vid.muted;
      muteBtn.innerHTML = vid.muted ? `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      ` : `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      `;
    });

    feedContainer.appendChild(item);
  });

  setupFeedObserver();
}

// Auto play/pause feed videos on scroll
let feedObserver = null;
function setupFeedObserver() {
  if (feedObserver) {
    feedObserver.disconnect();
  }

  feedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const vid = entry.target.querySelector(".feed-video");
        if (entry.isIntersecting) {
          vid.play().catch(() => {});
        } else {
          vid.pause();
        }
      });
    },
    { threshold: 0.6 }
  );

  document.querySelectorAll(".feed-item").forEach((item) => {
    feedObserver.observe(item);
  });
}

// Modal Player Functions
function openModal(index) {
  currentModalIndex = index;
  const video = currentVideos[index];

  modalTitle.textContent = video.title;
  modalSpecs.textContent = `${video.resolution} • ${video.formattedDuration} • ${video.formattedSize}`;
  modalDownload.href = video.src;
  modalDownload.download = `${video.title}.mp4`;

  modalVideo.src = video.src;
  modalVideo.load();
  modalVideo.play().then(() => {
    updatePlayPauseState(true);
  }).catch(() => {
    updatePlayPauseState(false);
  });

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalVideo.pause();
  modalVideo.src = "";
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function nextVideo() {
  if (currentModalIndex < 0) return;
  const nextIdx = (currentModalIndex + 1) % currentVideos.length;
  openModal(nextIdx);
}

function prevVideo() {
  if (currentModalIndex < 0) return;
  const prevIdx = (currentModalIndex - 1 + currentVideos.length) % currentVideos.length;
  openModal(prevIdx);
}

function updatePlayPauseState(isPlaying) {
  if (isPlaying) {
    iconPlay.style.display = "none";
    iconPause.style.display = "block";
    modalPlayOverlay.classList.remove("visible");
  } else {
    iconPlay.style.display = "block";
    iconPause.style.display = "none";
    modalPlayOverlay.classList.add("visible");
  }
}

function togglePlay() {
  if (modalVideo.paused) {
    modalVideo.play();
  } else {
    modalVideo.pause();
  }
}

function toggleMute() {
  modalVideo.muted = !modalVideo.muted;
  if (modalVideo.muted) {
    iconVolume.style.display = "none";
    iconMuted.style.display = "block";
  } else {
    iconVolume.style.display = "block";
    iconMuted.style.display = "none";
  }
}

// Event Listeners for Modal
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
modalNext.addEventListener("click", nextVideo);
modalPrev.addEventListener("click", prevVideo);

modalVideo.addEventListener("play", () => updatePlayPauseState(true));
modalVideo.addEventListener("pause", () => updatePlayPauseState(false));
modalVideo.parentElement.addEventListener("click", togglePlay);
ctrlPlay.addEventListener("click", togglePlay);
ctrlMute.addEventListener("click", toggleMute);

ctrlLoop.addEventListener("click", () => {
  modalVideo.loop = !modalVideo.loop;
  ctrlLoop.classList.toggle("active", modalVideo.loop);
});

ctrlSpeed.addEventListener("change", (e) => {
  modalVideo.playbackRate = parseFloat(e.target.value);
});

ctrlFullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    modalVideo.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen().catch(() => {});
  }
});

// Video Progress Updates
modalVideo.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(modalVideo.currentTime);
  totalTimeEl.textContent = formatTime(modalVideo.duration);

  if (modalVideo.duration) {
    const percent = (modalVideo.currentTime / modalVideo.duration) * 100;
    progressPlayed.style.width = `${percent}%`;
  }
});

modalVideo.addEventListener("progress", () => {
  if (modalVideo.buffered.length > 0 && modalVideo.duration) {
    const bufferedEnd = modalVideo.buffered.end(modalVideo.buffered.length - 1);
    const percent = (bufferedEnd / modalVideo.duration) * 100;
    progressBuffer.style.width = `${percent}%`;
  }
});

progressContainer.addEventListener("click", (e) => {
  const rect = progressContainer.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const ratio = Math.max(0, Math.min(1, clickX / rect.width));
  if (modalVideo.duration) {
    modalVideo.currentTime = ratio * modalVideo.duration;
  }
});

// View Switcher (Grid vs Feed)
tabGrid.addEventListener("click", () => {
  tabGrid.classList.add("active");
  tabGrid.setAttribute("aria-selected", "true");
  tabFeed.classList.remove("active");
  tabFeed.setAttribute("aria-selected", "false");
  gridView.classList.add("active");
  feedView.classList.remove("active");

  // Pause feed videos
  document.querySelectorAll(".feed-video").forEach((v) => v.pause());
});

tabFeed.addEventListener("click", () => {
  tabFeed.classList.add("active");
  tabFeed.setAttribute("aria-selected", "true");
  tabGrid.classList.remove("active");
  tabGrid.setAttribute("aria-selected", "false");
  feedView.classList.add("active");
  gridView.classList.remove("active");

  if (!feedContainer.children.length) {
    renderFeed();
  } else {
    setupFeedObserver();
  }
});

// Sort
sortSelect.addEventListener("change", (e) => {
  const mode = e.target.value;
  switch (mode) {
    case "duration-asc":
      currentVideos.sort((a, b) => a.duration - b.duration);
      break;
    case "duration-desc":
      currentVideos.sort((a, b) => b.duration - a.duration);
      break;
    case "size-asc":
      currentVideos.sort((a, b) => a.size - b.size);
      break;
    case "size-desc":
      currentVideos.sort((a, b) => b.size - a.size);
      break;
    default:
      currentVideos = [...videoData];
      break;
  }

  renderGrid();
  if (feedView.classList.contains("active")) {
    renderFeed();
  }
});

// Keyboard Navigation
window.addEventListener("keydown", (e) => {
  if (modal.classList.contains("active")) {
    switch (e.key) {
      case "Escape":
        closeModal();
        break;
      case " ":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        modalVideo.currentTime = Math.max(0, modalVideo.currentTime - 5);
        break;
      case "ArrowRight":
        e.preventDefault();
        modalVideo.currentTime = Math.min(modalVideo.duration, modalVideo.currentTime + 5);
        break;
      case "ArrowUp":
        e.preventDefault();
        prevVideo();
        break;
      case "ArrowDown":
        e.preventDefault();
        nextVideo();
        break;
      case "m":
      case "M":
        toggleMute();
        break;
      case "f":
      case "F":
        if (!document.fullscreenElement) {
          modalVideo.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
        break;
    }
  }
});

// Initialize
renderGrid();
