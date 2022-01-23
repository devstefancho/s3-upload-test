const form = document.querySelector('#imageForm');
const input = document.querySelector('#imageInput');
const imageList = document.querySelector('.imageList');

// --- 이미지 업로드시에 발생하는 이벤트 ---
input.addEventListener('change', async event => {
  // 이미지 preview 올리기
  console.log(event.target.files)
  const files = Array.from(event.target.files);
  files
    .map(file => createImageSrc(file))
    .forEach(element => imageList.appendChild(element))
})

function createImageSrc(file) {
  const src = URL.createObjectURL(file);
  const preview = document.createElement('img')
  preview.src = src;
  return preview;
}

// --- s3 저장시에 발생하는 이벤트 ---
form.addEventListener('submit', async event => {
  event.preventDefault();

  // 각 파일에 대한 url 생성
  const filesWithUrl = await generateUrls(input.files)

  // s3에 이미지 저장
  const s3Files = filesWithUrl.map(({ url, file }) => saveFiles(url, file))
  Promise.all(s3Files).then((value) => console.log('서버에 POST로 넘겨줄 데이터들', value))
})

async function saveFiles(url, file) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    body: file
  })
  return {
    url: url,
    file: file,
    date: response.headers.get('Date'),
  }
}

async function generateUrls(files) {
  // secure url 생성해서 가져옴
  const fileWithUrl = [];
  for await (const file of files) {
    const { url } = await fetch(`http://localhost:5500/s3Url?file_name=${file.name}`)
      .then(res => res.json())
    fileWithUrl.push({ url, file });
  }
  return fileWithUrl;
}