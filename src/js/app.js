// Màn hình mở đầu chỉ đếm 3, 2, 1 rồi tự mở thiệp.
const intro=document.getElementById('intro');
const lastNumber=document.getElementById('lastNumber');
let remaining=3;
const countdown=setInterval(()=>{
  remaining--;
  if(remaining>0){
    lastNumber.textContent=String(remaining);
  }else{
    clearInterval(countdown);
    setTimeout(()=>{intro.classList.add('hide');startBirthdayMusic();celebrate();},450);
  }
},1000);

// Tự phát nhạc đúng lúc bộ đếm kết thúc; hiện nút dự phòng nếu trình duyệt chặn autoplay.
const birthdayMusic=document.getElementById('birthdayMusic');
birthdayMusic.volume=0.75;
async function startBirthdayMusic(){
  try{
    await birthdayMusic.play();
  }catch(error){
  }
}

// Hạt sáng li ti chuyển động khắp nền.
const ambient=document.getElementById('ambient');
const actx=ambient.getContext('2d');
let dust=[];
function resizeDust(){
  const dpr=Math.min(devicePixelRatio||1,2);
  ambient.width=innerWidth*dpr;ambient.height=innerHeight*dpr;
  actx.setTransform(dpr,0,0,dpr,0,0);
  dust=Array.from({length:Math.min(110,Math.round(innerWidth*innerHeight/9000))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:.6+Math.random()*1.8,vy:.12+Math.random()*.38,p:Math.random()*6.28,h:Math.random()<.55?332:45}));
}
function drawDust(t){
  actx.clearRect(0,0,innerWidth,innerHeight);
  for(const d of dust){
    d.y-=d.vy;if(d.y< -5){d.y=innerHeight+5;d.x=Math.random()*innerWidth}
    const a=.28+.55*((Math.sin(t/650+d.p)+1)/2);
    actx.beginPath();actx.fillStyle=`hsla(${d.h},100%,82%,${a})`;actx.shadowColor=`hsla(${d.h},100%,75%,${a})`;actx.shadowBlur=8;actx.arc(d.x,d.y,d.r,0,Math.PI*2);actx.fill();
  }
  actx.shadowBlur=0;requestAnimationFrame(drawDust);
}
resizeDust();addEventListener('resize',resizeDust);requestAnimationFrame(drawDust);

// Hộp quà mở khung lời chúc.
const modal=document.getElementById('wishModal');
const wishTitle=document.getElementById('wishTitle');
const gift=document.getElementById('openGift');
const wishText=document.getElementById('wishText');
const wishes=[
  'Chúc Hạ Vy sinh nhật thật vui, tuổi mới ngập tràn tiếng cười! 🎂',
  'Chúc mọi ước mơ của Hạ Vy đều thành hiện thực! ✨',
  'Mong bạn luôn rạng rỡ, bình an và được yêu thương thật nhiều! 💖',
  'Chúc Hạ Vy gặp thật nhiều may mắn và những điều ngọt ngào! 🌹',
  'Tuổi mới thật xinh đẹp, tự tin và tỏa sáng theo cách riêng nhé! 🌟',
  'Chúc mỗi ngày của Hạ Vy đều vui như ngày sinh nhật hôm nay! 🎉',
  'Kurumi gửi Hạ Vy một cái ôm thật lớn và thật nhiều yêu thương! 🖤'
];
let lastWish=-1;
function revealRandomWish(){
  let next=Math.floor(Math.random()*wishes.length);
  if(wishes.length>1) while(next===lastWish) next=Math.floor(Math.random()*wishes.length);
  lastWish=next;
  wishText.classList.remove('reveal');
  void wishText.offsetWidth;
  wishText.textContent=wishes[next];
  wishText.classList.add('reveal');
}
const wishContent=document.getElementById('wishContent');
const centerGift=document.getElementById('centerGift');
function returnGiftToCard(){
  modal.classList.remove('open');
  centerGift.classList.remove('opened');
  centerGift.style.display='';
  wishContent.classList.remove('visible');
  wishTitle.textContent='Gửi Hạ Vy yêu quý';
}
gift.addEventListener('click',()=>modal.classList.add('open'));
centerGift.addEventListener('click',()=>{
  centerGift.classList.add('opened');
  wishContent.classList.add('visible');
  revealRandomWish();
});
document.getElementById('anotherWish').addEventListener('click',revealRandomWish);
document.getElementById('closeModal').addEventListener('click',returnGiftToCard);
document.getElementById('returnToCard').addEventListener('click',returnGiftToCard);
modal.addEventListener('click',e=>{if(e.target===modal)returnGiftToCard()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))returnGiftToCard()});

// LỜI CHÚC DÙNG CHUNG: thay 2 giá trị bên dưới bằng thông tin Supabase của bạn.
// Lấy tại Supabase > Project Settings > API. Chỉ dùng publishable/anon public key.
// KHÔNG đặt service_role key trong HTML.
const SUPABASE_URL = "https://ymdgpbzekzglpxnrswwj.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_wRyMy3HiigS-a84-K3J1mg_2nlw7u5o";

const guestbookToggle=document.getElementById('guestbookToggle');
const guestbookForm=document.getElementById('guestbookForm');
const guestbookNote=guestbookForm.querySelector('.guestbook-note');
const wishWallItems=document.getElementById('wishWallItems');
const wishOrbit=document.getElementById('wishOrbit');
const wishOrbitEmpty=document.getElementById('wishOrbitEmpty');
wishOrbitEmpty.addEventListener('pointerdown',event=>event.stopPropagation());
wishOrbitEmpty.addEventListener('click',()=>{
  guestbookForm.classList.add('open');
  guestbookToggle.setAttribute('aria-expanded','true');
  document.getElementById('guestName').focus({preventScroll:true});
});
let latestWishId=0n;
let isLoadingWishes=false;
const PAGE_SIZE=500;
const supabaseReady=window.supabase && SUPABASE_URL.startsWith('https://') && !SUPABASE_URL.includes('PROJECT_ID') && SUPABASE_ANON_KEY.length>20 && !SUPABASE_ANON_KEY.includes('DAN_');
const sharedDb=supabaseReady?window.supabase.createClient(SUPABASE_URL,SUPABASE_ANON_KEY):null;

guestbookToggle.addEventListener('click',()=>{
  const opened=guestbookForm.classList.toggle('open');
  guestbookToggle.setAttribute('aria-expanded',String(opened));
});

function showSharedWish(item){
  const id=BigInt(item.id);
  if(id>latestWishId)latestWishId=id;
  if(document.querySelector(`[data-wish-id="${item.id}"]`))return;
  const card=document.createElement('article');
  card.className='wish-wall-card';
  card.dataset.wishId=String(item.id);
  const sender=document.createElement('strong');
  sender.textContent=item.name+' gửi lời chúc 💖';
  const message=document.createElement('span');
  message.textContent=item.message;
  card.append(sender,message);
  wishWallItems.prepend(card);
  showOrbitWish(item);
}

function showOrbitWish(item){
  wishOrbitEmpty.remove();
  const bubble=document.createElement('button');
  bubble.type='button';
  bubble.className='wish-orbit-item';
  bubble.dataset.wishId=String(item.id);
  bubble.setAttribute('aria-label',`Đọc lời chúc của ${item.name}`);
  const sender=document.createElement('strong');
  sender.textContent=`${item.name} gửi lời chúc`;
  const preview=document.createElement('span');
  preview.textContent=item.message;
  bubble.append(sender,preview);
  bubble.addEventListener('pointerdown',event=>event.stopPropagation());
  bubble.addEventListener('click',event=>{
    event.stopPropagation();
    wishTitle.textContent=`Lời chúc từ ${item.name}`;
    wishText.classList.remove('reveal');
    void wishText.offsetWidth;
    wishText.textContent=item.message;
    wishText.classList.add('reveal');
    centerGift.style.display='none';
    wishContent.classList.add('visible');
    modal.classList.add('open');
  });
  wishOrbit.prepend(bubble);
  const maxVisible=innerWidth<=520?4:8;
  while(wishOrbit.children.length>maxVisible)wishOrbit.lastElementChild.remove();
}

async function loadSharedWishes(){
  if(!sharedDb||isLoadingWishes)return;
  isLoadingWishes=true;
  try{
    const afterId=latestWishId;
    let offset=0;
    while(true){
      let query=sharedDb.from('birthday_wishes')
        .select('id,name,message,created_at')
        .order('id',{ascending:true})
        .range(offset,offset+PAGE_SIZE-1);
      if(afterId>0n)query=query.gt('id',afterId.toString());
      const {data,error}=await query;
      if(error){console.error('Không tải được lời chúc:',error.message);break;}
      const rows=data||[];
      rows.forEach(showSharedWish);
      if(rows.length<PAGE_SIZE)break;
      offset+=PAGE_SIZE;
    }
  }catch(error){
    console.error('Lỗi đồng bộ lời chúc:',error);
  }finally{
    isLoadingWishes=false;
  }
}

guestbookForm.addEventListener('submit',async event=>{
  event.preventDefault();
  const name=document.getElementById('guestName').value.trim();
  const message=document.getElementById('guestWish').value.trim();
  if(!name||!message)return;
  if(!sharedDb){
    guestbookNote.classList.add('is-warning');
    guestbookNote.textContent='Hãy điền Project URL và khóa public Supabase trong mã để chia sẻ lời chúc.';
    return;
  }
  const button=guestbookForm.querySelector('.guestbook-send');
  button.disabled=true;button.textContent='Đang gửi…';
  const {data,error}=await sharedDb.from('birthday_wishes')
    .insert({name,message})
    .select('id,name,message,created_at')
    .single();
  button.disabled=false;button.textContent='Gửi lời chúc ✨';
  if(error){
    guestbookNote.classList.add('is-warning');
    guestbookNote.textContent='Chưa gửi được. Hãy kiểm tra cấu hình Supabase rồi thử lại.';
    console.error('Không gửi được lời chúc:',error.message);
    return;
  }
  showSharedWish(data);
  guestbookNote.classList.remove('is-warning');
  guestbookNote.textContent='Đã gửi lời chúc đến mọi người!';
  guestbookForm.reset();
  guestbookForm.classList.remove('open');
  guestbookToggle.setAttribute('aria-expanded','false');
});

if(sharedDb){
  loadSharedWishes();
  setInterval(loadSharedWishes,8000);
}

// Pháo giấy khi thiệp xuất hiện.
function celebrate(){
  const colors=['#ff4d8d','#ffd166','#7bdff2','#b8f2a1','#c77dff'];
  for(let i=0;i<55;i++){
    const bit=document.createElement('i');bit.className='confetti';bit.style.left=Math.random()*100+'vw';bit.style.background=colors[Math.floor(Math.random()*colors.length)];bit.style.animationDuration=2.5+Math.random()*2.5+'s';bit.style.animationDelay=Math.random()*1.2+'s';document.body.appendChild(bit);setTimeout(()=>bit.remove(),6000);
  }
}

// Bánh sinh nhật 3D bằng hạt sáng: tự xoay nhẹ và kéo/vuốt để xoay theo ảnh mẫu.
const cakeStage=document.getElementById('cakeStage');
const cakeCanvas=document.getElementById('cakeCanvas');
const cakeCtx=cakeCanvas.getContext('2d');
let cakeParticles=[];
let rotY=-.38,rotX=-.18,draggingCake=false,lastPointerX=0,lastPointerY=0;
function buildCakeParticles(){
  const pts=[];
  const add=(x,y,z,color,size,glow=1)=>pts.push({x,y,z,color,size,glow,phase:Math.random()*Math.PI*2});
  function fillTier(radius,y0,y1,colors,count){
    for(let i=0;i<count;i++){
      const a=Math.random()*Math.PI*2,r=radius*Math.sqrt(Math.random());
      add(Math.cos(a)*r,y0+Math.random()*(y1-y0),Math.sin(a)*r,colors[Math.floor(Math.random()*colors.length)],.7+Math.random()*1.65,.7+Math.random());
    }
  }
  function ring(radius,y,color,count,size=1.6){
    for(let i=0;i<count;i++){const a=i/count*Math.PI*2;add(Math.cos(a)*radius,y,Math.sin(a)*radius,color,size+Math.random(),1.2)}
  }
  // Hai tầng bánh, phủ kem và các đường viền hạt sáng.
  fillTier(56,-36,5,['#ff2f9a','#ff55ba','#c535ff','#ff86d2'],1550);
  fillTier(39,5,35,['#ffe7fa','#ffc8ef','#ff91d3','#f7d7ff'],880);
  fillTier(34,35,59,['#ff55b5','#e84bd3','#ff8bd7','#ffc2ef'],620);
  fillTier(37,58,62,['#fff4ff','#ffe1f7','#ffd0ed'],300);
  ring(56,-34,'#ffb9ed',210,1.8);ring(56,4,'#ffd7f7',190,1.7);
  ring(39,7,'#fff1ff',170,1.5);ring(39,35,'#ffc8f0',155,1.7);
  ring(37,58,'#fff4ff',150,1.7);
  // Kem chảy thành giọt quanh tầng trên.
  for(let i=0;i<180;i++){
    const a=i/180*Math.PI*2,r=37+Math.random()*1.5,drop=3+Math.random()*10;
    for(let j=0;j<5;j++)add(Math.cos(a)*r,56-drop*j/5,Math.sin(a)*r,j%2?'#ffe1f8':'#fff5ff',1+Math.random()*1.2,1.4);
  }
  // Nến ba màu và ngọn lửa lấp lánh.
  const candles=[[-15,66,-7],[0,67,0],[15,66,7]];
  for(const [x,y,z] of candles){
    for(let j=0;j<95;j++)add(x+(Math.random()-.5)*3,y+Math.random()*23,z+(Math.random()-.5)*3,j%3?'#ffd9f5':'#fff2a8',1+Math.random()*1.2,1.5);
    for(let j=0;j<70;j++){const a=Math.random()*Math.PI*2,r=Math.random()*4;add(x+Math.cos(a)*r,y+24+Math.random()*9,z+Math.sin(a)*r,['#fff6a8','#ff8c38','#ff4eb8'][j%3],1+Math.random()*1.8,2.2)}
  }
  // Hạt bụi sao rời bay quanh mô hình.
  for(let i=0;i<180;i++){const a=Math.random()*Math.PI*2,r=62+Math.random()*45;add(Math.cos(a)*r,(Math.random()-.5)*130,Math.sin(a)*r,Math.random()<.5?'#ff71d1':'#bd8bff',.65+Math.random()*1.35,.8)}
  return pts;
}
cakeParticles=buildCakeParticles();
function drawCake(time){
  const rect=cakeCanvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
  const pw=Math.max(1,Math.round(rect.width*dpr)),ph=Math.max(1,Math.round(rect.height*dpr));
  if(cakeCanvas.width!==pw||cakeCanvas.height!==ph){cakeCanvas.width=pw;cakeCanvas.height=ph;}
  const w=pw/dpr,h=ph/dpr;cakeCtx.setTransform(dpr,0,0,dpr,0,0);cakeCtx.clearRect(0,0,w,h);
  if(!draggingCake)rotY+=.0015;
  const scale=Math.min(w/170,h/172)*.82,cx=w/2,cy=h/2+30*scale;
  const cyR=Math.cos(rotY),syR=Math.sin(rotY),cxR=Math.cos(rotX),sxR=Math.sin(rotX);
  const points=cakeParticles.map(p=>{
    const x=p.x*cyR-p.z*syR,z1=p.x*syR+p.z*cyR;
    const y=p.y*cxR-z1*sxR,z=p.y*sxR+z1*cxR;
    const perspective=430/(430+z*scale);
    return{x:cx+x*scale*perspective,y:cy-y*scale*perspective,z,size:p.size*perspective,c:p.color,g:p.glow,phase:p.phase};
  }).sort((a,b)=>a.z-b.z);
  for(const p of points){
    const flicker=.72+.28*Math.sin(time*.004+p.phase);
    cakeCtx.globalAlpha=p.g*flicker;cakeCtx.fillStyle=p.c;cakeCtx.shadowColor=p.c;cakeCtx.shadowBlur=3+p.g*5;
    cakeCtx.beginPath();cakeCtx.arc(p.x,p.y,Math.max(.55,p.size),0,Math.PI*2);cakeCtx.fill();
  }
  cakeCtx.globalAlpha=1;cakeCtx.shadowBlur=0;requestAnimationFrame(drawCake);
}
requestAnimationFrame(drawCake);
cakeStage.addEventListener('pointerdown',e=>{draggingCake=true;lastPointerX=e.clientX;lastPointerY=e.clientY;cakeStage.setPointerCapture(e.pointerId)});
cakeStage.addEventListener('pointermove',e=>{if(!draggingCake)return;rotY+=(e.clientX-lastPointerX)*.012;rotX=Math.max(-.62,Math.min(.62,rotX+(e.clientY-lastPointerY)*.009));lastPointerX=e.clientX;lastPointerY=e.clientY});
function stopCakeDrag(){draggingCake=false}
cakeStage.addEventListener('pointerup',stopCakeDrag);cakeStage.addEventListener('pointercancel',stopCakeDrag);cakeStage.addEventListener('lostpointercapture',stopCakeDrag);

// Các thẻ lời chúc gần đây chạy theo quỹ đạo quanh bánh, độc lập với thao tác xoay mô hình 3D.
const reduceOrbitMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function animateWishOrbit(now){
  const items=[...wishOrbit.children];
  if(items.length){
    const rect=cakeStage.getBoundingClientRect();
    const radiusX=Math.max(0,Math.min(rect.width*.37,rect.width/2-72));
    const radiusY=Math.max(0,Math.min(rect.height*.32,rect.height/2-28));
    const orbitAngle=reduceOrbitMotion?0:now*.00016;
    items.forEach((item,index)=>{
      const angle=orbitAngle+index/items.length*Math.PI*2;
      const depth=(Math.sin(angle)+1)/2;
      item.style.left=`${rect.width/2+Math.cos(angle)*radiusX}px`;
      item.style.top=`${rect.height/2+Math.sin(angle)*radiusY}px`;
      item.style.opacity=String(.66+depth*.34);
      item.style.zIndex=String(10+Math.round(depth*30));
      item.style.transform=`translate(-50%,-50%) scale(${.82+depth*.18})`;
    });
  }
  requestAnimationFrame(animateWishOrbit);
}
requestAnimationFrame(animateWishOrbit);
