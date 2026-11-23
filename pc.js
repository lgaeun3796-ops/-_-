/* members */
const memberView = document.querySelector(".member_view");
const memberCards = document.querySelectorAll(".member_card");

memberCards.forEach((card) => {
    card.addEventListener("click", () => {
        const isActive = card.classList.contains("active");

        memberCards.forEach((item) => {
            item.classList.remove("active");
        });

        if (isActive) {
            return;
        }

        card.classList.add("active");

        card.addEventListener("transitionend", function onEnd(event) {
            if (event.propertyName === "flex-basis" && card.classList.contains("active")) {
                const cardRect = card.getBoundingClientRect();
                const viewRect = memberView.getBoundingClientRect();

                if (cardRect.left < viewRect.left) {
                    memberView.scrollLeft += cardRect.left - viewRect.left;
                } else if (cardRect.right > viewRect.right) {
                    memberView.scrollLeft += cardRect.right - viewRect.right;
                }

                card.removeEventListener("transitionend", onEnd);
            }
        });
    });
});

let memberMouseX = null;
let memberFrame = null;

function moveMembers() {
    if (memberMouseX !== null) {
        const rect = memberView.getBoundingClientRect();
        const edge = rect.width * 0.18;
        let speed = 0;

        if (memberMouseX > rect.right - edge) {
            speed = ((memberMouseX - (rect.right - edge)) / edge) * 14;
        } else if (memberMouseX < rect.left + edge) {
            speed = -((rect.left + edge - memberMouseX) / edge) * 14;
        }

        memberView.scrollLeft += speed;
        memberFrame = requestAnimationFrame(moveMembers);
    } else {
        memberFrame = null;
    }
}

memberView.addEventListener("mouseenter", (event) => {
    memberMouseX = event.clientX;

    if (!memberFrame) {
        memberFrame = requestAnimationFrame(moveMembers);
    }
});

memberView.addEventListener("mousemove", (event) => {
    memberMouseX = event.clientX;
});

memberView.addEventListener("mouseleave", () => {
    memberMouseX = null;
    cancelAnimationFrame(memberFrame);
    memberFrame = null;
});

/* album */
const albumView = document.querySelector(".album_view");
const albumList = document.querySelector(".album_list");

let albumMouseX = null;
let albumMoveX = 0;
let albumFrame = null;

function moveAlbum() {
    if (albumMouseX !== null) {
        const rect = albumView.getBoundingClientRect();
        const maxMove = Math.max(0, albumList.offsetWidth - albumView.clientWidth);
        const edge = 120;

        if (albumMouseX > rect.right - edge) {
            albumMoveX += 5;
        } else if (albumMouseX < rect.left + edge) {
            albumMoveX -= 5;
        }

        albumMoveX = Math.max(0, Math.min(albumMoveX, maxMove));
        albumList.style.transform = `translateX(-${albumMoveX}px)`;

        albumFrame = requestAnimationFrame(moveAlbum);
    } else {
        albumFrame = null;
    }
}

albumView.addEventListener("mousemove", (event) => {
    albumMouseX = event.clientX;

    if (!albumFrame) {
        albumFrame = requestAnimationFrame(moveAlbum);
    }
});

albumView.addEventListener("mouseleave", () => {
    albumMouseX = null;
    cancelAnimationFrame(albumFrame);
    albumFrame = null;
});
