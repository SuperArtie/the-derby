(function(){
  'use strict';

  $(document).ready(function(){
    alert('document is ready');
    $('.assetName a').click(betAsset);
  });
  function betAsset(e){
    console.log('hey');
    var assetName = $(this).text(),
        gamblerId = $(this).closest('.gambler').attr('data-gambler-id'),
        url       = '/gamblers/' + gamblerId + '/assets/' + assetName,
        type      = 'delete';
    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $gam = $('.gambler[data-gambler-id='+data.id+']'),
          $ass = $gam.find('.asset:contains('+data.name+')');
      $ass.fadeOut(989);
      setTimeout(function(){$ass.remove();}, 2000);
      $gam.find('.cash').text('$' + data.cash.toFixed(2));
      if(data.isDivorced){
        var $spo = $gam.find('.spousePhoto, .spouse');
        $spo.fadeOut();
        setTimeout(function(){$spo.remove();}, 2000);
      }
    }});
    console.log(gamblerId, assetName);
    e.preventDefault();
  }
})();

