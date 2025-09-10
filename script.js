function generateStars(value) {
    let totalStars = "";
    value = Math.round(value);
    for (let index = 0; index < value; index++) {
        let star = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" stroke-width="1"
        stroke="currentColor" class="size-6" width="18" height="18">
        <path stroke-linecap="round" stroke-linejoin="round"
        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
        `;
        totalStars += star;
    }
    return totalStars;
}

let products = []; // global store

async function getdata() {
    let result = await fetch(`./data/api.json`);
    result = await result.json();
    products = result.products;

    renderProducts(products); // render all initially
}

function renderProducts(list) {
    const items = document.getElementById("items");
    items.innerHTML = ""; // clear old results

    list.forEach(item => {
        items.innerHTML += `
            <div class="navc">
                <img src=${item.image_url} alt="">
                <h2>${item.title}</h2>
                <div class="text5">
                    <span style="color: red; font-size: 25px;">RS.${item.price}</span>
                    <span>-${item.discount_percent}%</span>
                </div>
                <span style="width: 100%; display: flex;">
                    <p style="color: rgba(0, 0, 0, 1);">Reviews: ${item.reviews}</p>
                </span>
                <span style="display:flex; width:50%; gap:4px; align-items: center">
                    <p>Rating: ${item.rating}</p>
                    ${generateStars(item.rating)}
                </span>
            </div>
        `;
    });
}

function searchProducts() {
    let input = document.getElementById("search").value.toLowerCase();

    let filtered = products.filter(p =>
        p.title.toLowerCase().includes(input)
    );

    renderProducts(filtered);
}

function rating4() {
    let filtered = products.filter(r =>
        r.rating > 4
    );
    renderProducts(filtered)
}

function allproducts() {
    getdata();
}

function sortprice() {
    let val = document.getElementById("sort").value;
    if (val == "low") {
        console.log("i am low ");

        let sorted = products.sort((a, b) => a.price - b.price)
        renderProducts(sorted)
    }
    else if (val == "high") {
        console.log("i am high ");
        let sorted = products.sort((a, b) => b.price - a.price)
        renderProducts(sorted)
    }

}

function sortreview() {
    let review = products.sort((a, b) => b.reviews - a.reviews)
    renderProducts(review)
}

getdata();