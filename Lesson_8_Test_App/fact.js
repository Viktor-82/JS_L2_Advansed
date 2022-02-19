let fact = n => {
    if(n == 1)
    return 1;
    return n * fact(n - 1);
}

module.exports = fact; // пишем это чтобы функция стала модулем и была доступной для использования извне