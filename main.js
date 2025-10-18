// ✨ Observer chung cho tất cả các phần có data-observe (bao gồm timeline-item)
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');

      // Lazy load ảnh
      const img = entry.target.querySelector('img[data-src]');
      if(img && !img.src){
        img.src = img.dataset.src;
        img.onload = ()=>{
          entry.target.classList.add('visible');
          const media = entry.target.querySelector('.media');
          if(media) media.classList.add('visible');
        };
      }
    }
  });
},{threshold:0.2, rootMargin: "0px 0px -10px 0px"});

// Áp dụng cho tất cả khối có data-observe
document.querySelectorAll('[data-observe]').forEach(el=>observer.observe(el));

// 🌸 Hiệu ứng nở hoa (giữ nguyên)
const bloomSection = document.querySelector('#bloom-section');
const flower = document.querySelector('#flower');
if(bloomSection){
  const bloomObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        flower.classList.add('play');
        obs.disconnect();
      }
    });
  },{threshold:0.45});
  bloomObs.observe(bloomSection);
}

// 🌿 Hiệu ứng "hoa mọc" khi scroll đến 40%
const hoaMoc = document.getElementById("hoa-moc");
if(hoaMoc){
  const hoaMocObs = new IntersectionObserver((entries, obs)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        hoaMoc.classList.remove("not-loaded");
        hoaMoc.classList.add("grow"); // nếu bạn có class hiệu ứng mọc
        obs.disconnect(); // chỉ kích hoạt 1 lần
      }
    });
  },{threshold:0.4});
  hoaMocObs.observe(hoaMoc);
}

// 🎶 Trình điều khiển nhạc dạng đĩa xoay, icon góc phải màn hình
const audio = document.getElementById('music');
const btn = document.getElementById('musicToggle');
const icon = document.getElementById('musicIcon');
const discContainer = document.querySelector('.music-floating');

let playing = true;

function updateIcon(){
  if(playing){
    icon.innerHTML = '<path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/>';
    discContainer.classList.add('playing');
  } else {
    icon.innerHTML = '<path d="M8 5v14l11-7z" fill="currentColor"/>';
    discContainer.classList.remove('playing');
  }
}
// 🎵 Tự động bật nhạc khi load trang
window.addEventListener('DOMContentLoaded', ()=>{
  if(audio){
    audio.play().then(()=>{
      playing = true;
      updateIcon();
    }).catch(()=>{ 
      // autoplay bị chặn, không sao, chờ người dùng click
      playing = false; 
      updateIcon();
    });
  }
});
if(btn){
  btn.addEventListener('click', ()=>{
    if(!audio) return;
    if(playing){
      audio.pause();
      playing = false;
    } else {
      audio.play().catch(()=>{});
      playing = true;
    }
    updateIcon();
  });

  btn.addEventListener('keydown', (e)=>{
    if(e.key==='Enter' || e.key===' '){
      e.preventDefault();
      btn.click();
    }
  });
}

if(audio){
  audio.addEventListener('play', ()=>{ playing = true; updateIcon(); });
  audio.addEventListener('pause', ()=>{ playing = false; updateIcon(); });
}

// Cuộn mượt
try{ document.documentElement.style.scrollBehavior = 'smooth'; }catch(e){}
