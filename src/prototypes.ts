/* eslint-disable no-extend-native */
/* eslint-disable func-names */

Number.prototype.toReal = function () {
  return this.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 5,
  });
};

String.prototype.toReal = function () {
  return parseFloat(this).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 5,
  });
};

String.prototype.toFloat = function () {
  return parseFloat(this.replace(',', '.'));
};

String.prototype.toCellphone = function () {
  return this.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

String.prototype.toPhone = function () {
  return this.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
};

String.prototype.toCnpj = function () {
  return this.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

String.prototype.toTitle = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.toDate = function (br = true) {
  return br ? this.split('-').reverse().join('/') : this.split('/').reverse().join('-');
};

Date.prototype.toDate = function (br = true) {
  const strDate = this.toISOString().split('T')[0];
  return br ? strDate : strDate.toDate(false);
};

Array.prototype.isEmpty = function () {
  return this.length === 0;
};
