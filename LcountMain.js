// Get the current date
let currentDate = new Date();
let kdate = "";
let open_days = 14;
let dateDifference = {};

//html elements
let dnum = document.querySelector(".days_number");
let hnum = document.querySelector(".hours_number");
let mnum = document.querySelector(".minutes_number");
let snum = document.querySelector(".seconds_number");
//

// Storing the key
let lfkey = "lfkey";

storeFutureDate();

/*  Below function is used to store the future date */
function storeFutureDate() {
  let litem = localStorage.getItem(lfkey);
  if (litem) {
    let fdate = JSON.parse(litem);
    kdate = new Date(fdate);
    dateDifference = calculateDateDifference(currentDate, kdate);
    if (Object.keys(dateDifference).length === 0) {
      dateDifference.days = 0;
      dateDifference.hours = 0;
      dateDifference.minutes = 0;
      dateDifference.seconds = 0;
      setSlate(dateDifference);
    }
    else {
      console.log(dateDifference);
      setSlate(dateDifference);
      timersets();
    }
  } else {
    // Add 14 days
    const futureDate = new Date(currentDate);
    futureDate.setDate(currentDate.getDate() + open_days);
    localStorage.setItem(lfkey, JSON.stringify(futureDate));
  }
}

/* Below function is used to calculate the time difference */
function calculateDateDifference(startDate, endDate) {
  if (endDate >= startDate) {
    const timeDifference = endDate - startDate;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  } else {
    return {};
  }
}

function setSlate(ddf) {
  dnum.textContent = ddf.days.toString().padStart(2, "0");
  hnum.textContent = ddf.hours.toString().padStart(2, "0");
  mnum.textContent = ddf.minutes.toString().padStart(2, "0");
  snum.textContent = ddf.seconds.toString().padStart(2, "0");
}

async function timersets() {
  let endcountdown = await counter();
  if (endcountdown === open_days) {
    dnum.textContent = "LA"; 
    hnum.textContent = "UN";
    mnum.textContent = "CH";
    snum.textContent = "ED";
  } 
  localStorage.removeItem(lfkey); 
}

function counter() {
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (Number.parseInt(hnum.textContent) != 0) {
        currentDate = new Date();
        dateDifference = calculateDateDifference(currentDate, kdate);
        setSlate(dateDifference);
      } else {
        resolve(open_days);
      }
    }, 1000);
  });
}
