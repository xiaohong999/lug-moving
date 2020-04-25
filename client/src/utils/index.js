export const PROMO_CODES = [
    {
        key: "stayhome",
        value: 10,
    },
];

export const CATEGORIES = [
    {
        id: 1,
        name: "Urgent Across Town",
        iconNormal: "images/c-01-normal.png",
        iconActive: "images/c-01-active.png",
    },
    {
        id: 2,
        name: "Evening Delivery",
        iconNormal: "images/c-02-normal.png",
        iconActive: "images/c-02-active.png",
    },
    {
        id: 3,
        name: "One Man Van",
        iconNormal: "images/c-03-normal.png",
        iconActive: "images/c-03-active.png",
    },
    {
        id: 4,
        name: "Two Men, One Truck",
        iconNormal: "images/c-04-normal.png",
        iconActive: "images/c-04-active.png",
    },
    {
        id: 5,
        name: "Trademe Pickup & Delivery",
        iconNormal: "images/c-05-normal.png",
        iconActive: "images/c-05-active.png",
    },
    {
        id: 6,
        name: "Small Move",
        iconNormal: "images/c-06-normal.png",
        iconActive: "images/c-06-active.png",
    },
];

export const VEHICLES = [
    {
        id: 1,
        name: "Car",
        title: "1 man car",
        luggers: 1,
        description: "Smaller items that will fit in a hatch back.",
        fee: 7.5,
        pricePerKm: 1.25,
        icon: "../images/v-01.png",
    },
    {
        id: 2,
        name: "Van",
        title: "1 man van",
        luggers: 1,
        description: "Couple of larger items, you help load/unload.",
        fee: 29,
        pricePerKm: 1.66,
        icon: "../images/v-02.png",
    },
    {
        id: 3,
        name: "Van",
        title: "2 men van",
        luggers: 2,
        description: "Few larger items, room full of stuff, small moves.",
        fee: 39,
        pricePerKm: 2.2,
        icon: "../images/v-02.png",
    },
    {
        id: 4,
        name: "Truck",
        title: "2 men truck",
        luggers: 2,
        description: "Room full of stuff or a flat/apartment move.",
        fee: 69,
        pricePerKm: 2.3,
        icon: "../images/v-03.png",
    },
];

export const SERVICES = [
    {
        id: 0,
        link: "store-delivery",
        name: "Store delivery",
        title: "Store delivery in under an hour",
        description:
            "Shop that new sofa from your local furniture store and let us pick it up and deliver into your home, right where you want it. Same day. Effortlessly.",
        steps: [
            {
                icon: "/images/landing-step-01.png",
                title: "Pick up from any store",
                description: "Shop at all your favourite places, we pick from any shop in our service area.",
            },
            {
                icon: "/images/landing-step-02.png",
                title: "Same day delivery",
                description: "Your purchases delivered in under 1-hour or at any time that works best for you.",
            },
            {
                icon: "/images/landing-step-03.png",
                title: "Stay Updated",
                description: "We will keep you updated via text. You can even track your delivery live on google maps.",
            },
        ],
    },
    {
        id: 1,
        link: "marketplace",
        name: "Marketplace Delivery",
        title: "Bought something on trademe or facebook and need it picked up?",
        description:
            "It has never been easier to buy used items locally on services such as TradeMe and Facebook Marketplace. The only part you will have to do is book a Lug to get your goods to you.",
        steps: [
            {
                icon: "/images/landing-step-01.png",
                title: "Pay the seller",
                description: "Simply pay the seller online, provide us with any references we might need to collect.",
            },
            { icon: "/images/landing-step-02.png", title: "Lug it", description: "Let the seller know you will be sending a Lug to collect for you." },
            { icon: "/images/landing-step-03.png", title: "Track it", description: "Put your feet up and track your purchase on live time maps." },
        ],
    },
    {
        id: 2,
        link: "urgent-delivery",
        name: "Urgent Delivery",
        title: "Whatever it is, we can get it across town ASAP",
        description: "Whether it is a bunch of flowers or a couch you need moving quickly, we can help. Getting your items across town quickly with a push of a button.",
        steps: [
            { icon: "/images/landing-step-01.png", title: "Book with a click", description: "Book swiftly with our on-demand booking system." },
            {
                icon: "/images/landing-step-02.png",
                title: "Stay up to date",
                description: "With text updates you can ensure your item is ready on time to be swept up by our Lugger.",
            },
            { icon: "/images/landing-step-03.png", title: "Relax", description: "We will get your item where it needs to go without the stress." },
        ],
    },
    {
        id: 3,
        link: "one-man-van",
        name: "One Man Van",
        title: "One man van is the most affordable option for getting larger items that won’t fit in your car picked up and delivered",
        description:
            "We’ll send a man in a van to go pick up you item(s) and deliver them to you at a time that works for you. All we ask is if the items are really large or heavy, there is someone to help the driver carry it.",
        steps: [
            { icon: "/images/landing-step-01.png", title: "Pick up from anywhere", description: "We pick from anywhere in our in our service area." },
            {
                icon: "/images/landing-step-02.png",
                title: "Delivered when it suits you",
                description: "Your item is picked up and delivered at any time that works best for you. 9am – 9pm, 7 days a week.",
            },
            {
                icon: "/images/landing-step-03.png",
                title: "Stay Updated",
                description: "We will keep you updated via text. You can even track your delivery live on google maps.",
            },
        ],
    },
    {
        id: 4,
        link: "two-man-truck",
        name: "Two Man Truck",
        title: "Two man truck is the hassle free way to move stuff, we do all the heavy lifting",
        description:
            "We’ll send 2 luggers in a truck to go pick up your items and deliver them to you at a time that works for you. They will do all the heavy lifting, so you can relax.",
        steps: [
            { icon: "/images/landing-step-01.png", title: "Pick up from anywhere", description: "We pick from anywhere in our in our service area." },
            {
                icon: "/images/landing-step-02.png",
                title: "Delivered when it suits you",
                description: "Your item is picked up and delivered at any time that works best for you. 9am – 9pm, 7 days a week.",
            },
            {
                icon: "/images/landing-step-03.png",
                title: "Stay Updated",
                description: "We will keep you updated via text. You can even track your delivery live on google maps.",
            },
        ],
    },
    {
        id: 5,
        link: "small-move",
        name: "Small Move",
        title: "Arrange moving apartments or flats at the push of a button",
        description:
            "The perfect solution for moving apartments, rooms or just those few things too big to move on your own. Ease your moving worries with a push of a button.",
        steps: [
            {
                icon: "/images/landing-step-01.png",
                title: "Book simply",
                description: "Book with ease with our on-demand booking system, no need to call around for quotes, you will know your total in a few clicks.",
            },
            {
                icon: "/images/landing-step-02.png",
                title: "Be ready",
                description: "All you need to do is make sure everything is ready to collect from the pick-up.",
            },
            {
                icon: "/images/landing-step-03.png",
                title: "Stay up to date",
                description: "No need to worry about when your Luggers will arrive, receiving text updates at all stages of your move will ease your mind.",
            },
        ],
    },
];

export const TIMES = [
    {
        from: 9,
        to: 10,
    },
    {
        from: 10,
        to: 11,
    },
    {
        from: 11,
        to: 12,
    },
    {
        from: 12,
        to: 13,
    },
    {
        from: 13,
        to: 14,
    },
    {
        from: 14,
        to: 15,
    },
    {
        from: 15,
        to: 16,
    },
    {
        from: 16,
        to: 17,
    },
    {
        from: 17,
        to: 18,
    },
    {
        from: 18,
        to: 19,
    },
    {
        from: 19,
        to: 20,
    },
    {
        from: 20,
        to: 21,
    },
];

export function calcPrice(price, distance, fee, discount) {
    let value = Number(price * Number.parseFloat(distance / 1000) + fee);
    if (discount) {
        value = (value * (100 - discount)) / 100;
    }

    return value.toFixed(2);
}

export function get30DaysFromNow() {
    let now = new Date();
    let monthDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    let days = [
        {
            day: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            weekDay: "Today",
            firstDay: false,
        },
    ];

    let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    for (let i = 1; i < monthDays; i++) {
        let newDate = new Date(now);
        newDate.setDate(now.getDate() + i);
        days = [
            ...days,
            {
                day: newDate.getDate(),
                month: newDate.getMonth(),
                year: newDate.getFullYear(),
                weekDay: newDate.getDate() === 1 ? months[newDate.getMonth()] : weekDays[newDate.getDay()],
                firstDay: newDate.getDate() === 1 ? true : false,
            },
        ];
    }

    return days;
}
export function getDateString(date) {
    let now = new Date();
    let dateString = "";
    if (now.getDate() === Number(date.day) && now.getMonth() === Number(date.month) && now.getFullYear() === Number(date.year)) {
        dateString = "Today";
    } else {
        dateString = new Date(date.year, date.month, date.day).toDateString();
    }
    return dateString;
}

export function getTimeString(time) {
    if (time === 12) {
        return time + "pm";
    }
    if (time > 12) {
        return time - 12 + "pm";
    }
    return time + "am";
}

export function validEmail(value) {
    // ^\w + ([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
    if (/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g.test(value)) {
        return true;
    }
    return false;
}

export function validPhone(value) {
    if (!value.length || value.length > 20) {
        return false;
    }
    // if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value)) {
    // 	return true;
    // }
    return true;
}

export function validName(value) {
    if (!value.length || value.length > 256) {
        return false;
    }

    return true;
}

export function validDescription(value) {
    if (!value.length || value.length > 100) {
        return false;
    }

    return true;
}
