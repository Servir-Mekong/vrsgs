const download_btn = document.querySelector('#dwnldData');

// download_btn.addEventListener('click', () => {
//     // alert("btn click");
//     fetch('/api/getdata/', {
//         method: "GET",
//         // credentials: "same-origin",
//         headers: {
//           Accept: "application/json",
//           "X-Requested-With": "XMLHttpRequest"
//         },
//     })
//     .then((response) => response.json())
//     .then((data) => {
//         // console.log(data)
//         alert(data)
//     })
//     .catch((err) => {
//         console.log("err in fetch", err);
//     });
// });