function isRGB(value) {
  return /^#[a-f0-9]{3,6}$/i.test(value);
}

function DisplayData(options) {
  var rows = options.rows;
  this.el = $('<div/>');
  this.setRows(rows);
}

/**
 * @returns {HTMLDivElement}
 */
DisplayData.prototype.element = function() {
  return this.el[0];
};

DisplayData.prototype.setRows = function(rows) {
  this.el.empty().append.apply(this.el, rows.map(function(row) {
    var lineValue = $('<span class="display-data__line-value"/>');
    if (typeof row.value === 'string' && isRGB(row.value)) {
      lineValue.append(new RGB({ color: row.value }).element());
    } else if (row.value === false) {
      lineValue.text('❌');
    } else if (row.value === true) {
      lineValue.text('✔️');
    } else if (row.value === undefined) {
      lineValue.html('<i>empty</i>');
    } else if (row.value instanceof HTMLElement) {
      lineValue.append(row.value);
    } else {
      lineValue.append(row.value.toString());
    }

    return $('<div class="display-data__line"/>').append(
      $('<span class="display-data__line-title"/>').text(row.title),
      lineValue
    );
  }));
  return this;
};