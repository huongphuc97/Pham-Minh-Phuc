var sum_to_n_a = function (n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

var sum_to_n_b = function (n) {
    let sum = 0;
    [...Array(n).keys()].forEach(i => (sum += i + 1));
    return sum;
};

var sum_to_n_c = function (n) {
    let sum = 0;
    let i = 1;
    while (i <= n) {
        sum += i;
        i++;
    }
    return sum;
};
