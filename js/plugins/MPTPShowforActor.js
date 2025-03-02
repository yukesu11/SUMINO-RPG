//MPTPShowforActor.js

/*:ja
 *
 * @target MZ
 * @plugindesc アクターよってMP、TPの表示、非表示
 * @author DAMEDAMOUOSIMAIDA
 *
 * @help
 * アクターのメモ欄に
 * MP非表示の場合は<NoMPShow>
 * MP非表示にした上に、TPを２番目に詰めたい時は<NoMPShowUpShorten2>
 * TP非表示の場合は<NoTPShow>と入力して下さい。
 * 
 * 非推奨ですがHPも非表示に出来ます
 * その場合は<NoHPShow>と入力して下さい。
 * HP非表示にした上に、MPを１番目に詰め、TPを２番目に詰めたい時は
 * <NoHPShowUpShorten1>と入力して下さい。
 * 更に、HP、MP非表示にした上に、TPを１番目に詰めたい時は
 * <TPShowUpShorten>と入力して下さい。
 *
 * (例)
 * MPを１番目に表示、HP、TPは非表示の場合
 * アクターのメモ欄に
 * <NoHPShowUpShorten1>
 * <NoTPShow>
 * 
 * ！注意事項！
 * 非表示になるだけなので、機能は使う事が出来ます
 * 〇導物語シリーズみたいに体力、魔導力が数値で
 * 表示されないものを作る事が出来ます。
 *
 * このプラグインにはプラグインコマンドはないです。
 *
 * →利用規約
 * 改変、再配布ＯＫ、利用形態無制限、利用報告、クレ表示不要
 *
 * 【バーション】
 * 2021/12/22 Ver.1.0　公開
 * 
 */

(() => {

const pluginName = 'MPTPShowforActor';

Game_Actor.prototype.meta = function() {
return this.actor().meta;
};

Window_StatusBase.prototype.placeBasicGauges = function(actor, x, y) {

        if ((actor.meta().NoHPShow) || (actor.meta().NoHPShowUpShorten1) || (actor.meta().TPShowUpShorten)){
          //何も表示しません
        } else {
          this.placeGauge(actor, "hp", x, y);
        };

	if ((actor.meta().NoMPShow) || (actor.meta().NoMPShowUpShorten2) || (actor.meta().TPShowUpShorten)){
          //何も表示しません
        } else if (actor.meta().NoHPShowUpShorten1){
          //MPを１番目に詰める処理をします
	  this.placeGauge(actor, "mp", x, y);           	
        } else {
	  this.placeGauge(actor, "mp", x, y + this.gaugeLineHeight());
	};

    if ($dataSystem.optDisplayTp) {
	if (actor.meta().NoTPShow){
          //何も表示しません
        } else if (actor.meta().TPShowUpShorten){
          //TPを１番目に詰める処理をします
          this.placeGauge(actor, "tp", x, y);
        } else if ((actor.meta().NoMPShowUpShorten2) || (actor.meta().NoHPShowUpShorten1)) {
          //TPを２番目に詰める処理をします
          this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight());  	
        } else {
          this.placeGauge(actor, "tp", x, y + this.gaugeLineHeight() * 2);
	};
    }
};

})();
