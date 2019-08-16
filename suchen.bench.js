const TEST_ARRAY = [];
const SEARCH_ITEM = 777;

for (var i = 0; i < 10000; i++) {
  TEST_ARRAY.push(Math.round(Math.random() * 1000));
}

suite('Array iteration2', function() {
  benchmark('for', function() {
    for (var i = 0; i < TEST_ARRAY.length; i++) {
      if (TEST_ARRAY[i] === SEARCH_ITEM) return i;
    }
  });
  benchmark('while', function() {
    var i = 0;
    while (i < TEST_ARRAY.length) {
      if (TEST_ARRAY[i] === SEARCH_ITEM) return i;
      i++;
    }
  });
  benchmark('indexOf', function() {
    TEST_ARRAY.indexOf(SEARCH_ITEM);
  });
  benchmark('find', function() {
    TEST_ARRAY.find(item => item === SEARCH_ITEM);
  });
  benchmark('some', function() {
    TEST_ARRAY.some(item => item === SEARCH_ITEM);
  });
});
