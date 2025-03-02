// FadeText.js Ver.2.0.0
// MIT License (C) 2022 あわやまたな
// http://opensource.org/licenses/mit-license.php

/*:
* @target MV MZ
* @plugindesc 文章がフェードイン、フェードアウトします。
* @author あわやまたな (Awaya_Matana)
* @url https://awaya3ji.seesaa.net/article/485447461.html
* @help ツクールDSにあった、文章がフェードインして一定時間後にフェードアウトする機能
* ［文章のフェード表示］を追加します。
*
* ［プラグインコマンド（MV）］
* showFadingText フェード時間 ウェイト時間 早送りなし 一時停止 中央揃え
*
* 【フェード時間】数字
* フェードインまたはフェードアウトを開始してから完了するまでにかかる時間を
* フレーム単位で指定します。未入力だと30。
*
* 【ウェイト時間】数字
* フェードインを完了してからフェードアウトに移行するまでにかかる時間を
* フレーム単位で指定します。未入力だと120。
*
* 【早送りなし】true/false
* 決定ボタンが押されているときに表示を早送りする機能を無効にします。
* 未入力だとfalse。
*
* 【一時停止】true/false
* ボタン入力をするまでフェードアウトを待ちます。
* 未入力だとfalse。
*
* 【中央揃え】true/false
* 文字列を中央に揃えます。
* 未入力だとfalse。
*
* ［概要］
* プラグインコマンド直下の［文章のスクロール表示］を乗っ取って
* フェード表示として扱います。
* 
* ［文章のスクロール表示］が連続で並んでいる場合は全て
* ［文章のフェード表示］になります。
* ［文章のフェード表示］直後に［文章のスクロール表示］を行いたい場合は、
* ［注釈］など、なにかしら無意味なコマンドを挟むことで実現可能です。
*
* [更新履歴]
* 2022/02/01：Ver.1.0.0　公開。
* 2022/12/09：Ver.1.0.1　PluginCommonBaseの判別方法を変更。
* 2023/07/09：Ver.1.1.0　中央揃え用プラグインと連携する機能を追加しました。
* 2023/07/26：Ver.2.0.0　追加プラグインなしで中央揃え可能になりました。
*
* @command showFadingText
* @text 文章のフェード表示
* @desc プラグインコマンド直下の文章のスクロール表示を乗っ取ってフェード表示として扱います。
*
* @arg fadeDuration
* @text フェード時間
* @desc フェードインまたはフェードアウトを開始してから完了するまでにかかる時間をフレーム単位で指定します。
* @default 30
* @type number
*
* @arg waitDuration
* @text ウェイト時間
* @desc フェードインを完了してからフェードアウトに移行するまでにかかる時間をフレーム単位で指定します。
* @default 120
* @type number
*
* @arg noFastForward
* @text 早送りなし
* @desc 決定ボタンが押されているときに表示を早送りする機能を無効にします。
* @default false
* @type boolean
*
* @arg alignCenter
* @text 中央揃え
* @desc 文字列を中央に揃えます。
* @default false
* @type boolean
*
* @arg pause
* @text 一時停止
* @desc ボタン入力をするまでフェードアウトを待ちます。
* @default false
* @type boolean
*
* @param se
* @text 効果音
* @desc ボタン入力を行った時の効果音です。
* @default {"name":"","volume":"90", "pitch":"100","pan":"0"}
* @type struct<audio>
*
* @param trigger
* @text トリガー
* @desc ボタン入力の判定基準です。
* @default isTriggered
* @type select
* @option 押されている
* @value isPressed
* @option トリガーされている
* @value isTriggered
* @option リピートされている
* @value isRepeated
*
*/

/*~struct~audio:
*
* @param name
* @text 名前
* @desc 選択したファイルを再生します。
* @default 
* @type file
* @dir audio/se
*
* @param volume
* @text 音量
* @desc オーディオ再生の音量です。
* @default 
* @type number
*
* @param pitch
* @text ピッチ
* @desc オーディオ再生のピッチです。
* @default 
* @type number
*
* @param pan
* @text 位相
* @desc オーディオ再生の位相です。
* @default 
* @min -100
* @max 100
* @type number
*/

'use strict';
{
	const useMZ = Utils.RPGMAKER_NAME === "MZ";
	const pluginName = document.currentScript.src.match(/^.*\/(.*).js$/)[1];
	const hasPluginCommonBase = typeof PluginManagerEx === "function";
	const parameters = PluginManager.parameters(pluginName);
	const seParams = JSON.parse(parameters["se"] || "{}");
	const trigger = parameters["trigger"];
	Object.keys(seParams).forEach(key => key !== "name" ? seParams[key] = Number(seParams[key]) : 0);

	if (useMZ) {
		PluginManager.registerCommand(pluginName, "showFadingText", function (args) {
			$gameMessage.setFade(+args.fadeDuration, +args.waitDuration, args.noFastForward === 'true', args.pause === 'true', args.alignCenter === 'true');
		});
		if (hasPluginCommonBase) {
			PluginManagerEx.registerCommand(document.currentScript, "showFadingText", function (args) {
				$gameMessage.setFade(args.fadeDuration, args.waitDuration, args.noFastForward, args.pause, args.alignCenter);
			});
		}
	}
	const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		_Game_Interpreter_pluginCommand.apply(this, arguments);

		if (command === "showFadingText") {
			$gameMessage.setFade(+args[0] || 30, +args[1] || 120, args[2] === 'true', args[3] === 'true', args[4] === 'true');
		}

	};

	//-----------------------------------------------------------------------------
	// Game_Message

	const _Game_Message_clear = Game_Message.prototype.clear;
	Game_Message.prototype.clear = function() {
		_Game_Message_clear.call(this);
		this.clearFade();
	};

	Game_Message.prototype.clearFade = function() {
		this._fadeMode = false;
		this._fadeAlignCenter = false;
		this._fadeDuration = 0;
		this._fadeWaitDuration = 0;
		this._fadeNoFast = false;
		this._fadePause = false;
		this._fadeResume = false;
	};

	Game_Message.prototype.fadeMode = function() {
		return this._fadeMode;
	};

	Game_Message.prototype.fadeDuration = function() {
		return this._fadeDuration;
	};

	Game_Message.prototype.fadeWaitDuration = function() {
		return this._fadeWaitDuration;
	};

	Game_Message.prototype.fadeNoFast = function() {
		return this._fadeNoFast;
	};

	Game_Message.prototype.fadePause = function() {
		return this._fadePause;
	};

	Game_Message.prototype.fadeAlignCenter = function() {
		return this._fadeAlignCenter;
	};

	Game_Message.prototype.fadeResume = function() {
		return this._fadeResume;
	};

	const _Game_Message_setScroll = Game_Message.prototype.setScroll;
	Game_Message.prototype.setScroll = function() {
		if (!this.fadeMode()) _Game_Message_setScroll.apply(this, arguments);
	};

	Game_Message.prototype.setFade = function(fade, wait, noFast, pause, alignCenter) {
		this._fadeMode = true;
		this._fadeDuration = fade;
		this._fadeWaitDuration = wait;
		this._fadeNoFast = noFast;
		this._fadePause = pause;
		this._fadeAlignCenter = alignCenter;
	};

	Game_Message.prototype.setFadeResume = function(code) {
		this._fadeResume = code === 105;
	};

	//-----------------------------------------------------------------------------
	// Game_Interpreter

	const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
	Game_Interpreter.prototype.command101 = function() {
		$gameMessage.clearFade();
		return _Game_Interpreter_command101.apply(this, arguments);;
	};

	const _Game_Interpreter_command105 = Game_Interpreter.prototype.command105;
	Game_Interpreter.prototype.command105 = function() {
		const result = _Game_Interpreter_command105.apply(this, arguments);
		$gameMessage.setFadeResume(useMZ ? this.nextEventCode() : this.currentCommand().code);
		return result;
	};

	//-----------------------------------------------------------------------------
	// Scene_Map (MV)
	if (!useMZ) {
		const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
		Scene_Map.prototype.createAllWindows = function() {
			_Scene_Map_createAllWindows.call(this);
			this.createFadeTextWindow();
		};

		Scene_Map.prototype.createFadeTextWindow = function() {
			this._fadeTextWindow = new Window_FadeText();
			this.addWindow(this._fadeTextWindow);
		};

	//-----------------------------------------------------------------------------
	// Scene_Battle (MV)

		const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
		Scene_Battle.prototype.createAllWindows = function() {
			_Scene_Battle_createAllWindows.call(this);
			this.createFadeTextWindow();
		};

		Scene_Battle.prototype.createFadeTextWindow = function() {
			this._fadeTextWindow = new Window_FadeText();
			this.addWindow(this._fadeTextWindow);
		};
	}

	//-----------------------------------------------------------------------------
	// Scene_Message (MZ)

	if (useMZ) {
		const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
		Scene_Message.prototype.createAllWindows = function() {
			_Scene_Message_createAllWindows.call(this);
			this.createFadeTextWindow();
		}

		Scene_Message.prototype.createFadeTextWindow = function() {
			const rect = this.fadeTextWindowRect();
			this._fadeTextWindow = new Window_FadeText(rect);
			this.addWindow(this._fadeTextWindow);
		};

		Scene_Message.prototype.fadeTextWindowRect = function() {
			const wx = 0;
			const wy = 0;
			const ww = Graphics.boxWidth;
			const wh = Graphics.boxHeight;
			return new Rectangle(wx, wy, ww, wh);
		};
	}

	//-----------------------------------------------------------------------------
	// Window_Message

	const _Window_Message_canStart = Window_Message.prototype.canStart;
	Window_Message.prototype.canStart = function() {
		return !$gameMessage.fadeMode() && _Window_Message_canStart.call(this);
	};

	const _Window_Message_doesContinue = Window_Message.prototype.doesContinue;
	Window_Message.prototype.doesContinue = function() {
		return !$gameMessage.fadeMode() && _Window_Message_doesContinue.call(this);
	};

	//-----------------------------------------------------------------------------
	// Window_FadeText

	function Window_FadeText() {
		this.initialize(...arguments);
	}

	Window_FadeText.prototype = Object.create(Window_Base.prototype);
	Window_FadeText.prototype.constructor = Window_FadeText;

	Window_FadeText.prototype.initialize = function(rect) {
		if (useMZ) {
			Window_Base.prototype.initialize.call(this, rect);
			this._reservedRect = rect;
		} else {
			Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
		}
		this.opacity = 0;
		this.hide();
		this._text = "";
		this._allTextHeight = 0;
		this._count = 0;
		this._fade = 0;
		this._wait = 0;
		this._noFast = false;
		this._pause = false;
		this._resume = false;
		this._alignCenter = false;
		this._triggered = false;
		this.contentsOpacity = 0;
	};

	const startX = useMZ ? "startX" : "left";
	Window_FadeText.prototype.pushTextWidth = function(textState) {
		textState.textWidths.push(textState.x - textState[startX]);
	};

	Window_FadeText.prototype.setAlignCenter = function(textState) {
		const textWidth = textState.textWidths.shift() || 0;
		textState.x = (this.contentsWidth() - textWidth) / 2;
	};

	Window_FadeText.prototype.processAllText = function(textState) {
		if (textState.drawingCenter) {
			this.setAlignCenter(textState);
		}
		Window_Base.prototype.processAllText.apply(this, arguments);
		if (textState.calcTextWidths) {
			this.pushTextWidth(textState);
		}
	};

	Window_FadeText.prototype.processNewLine = function(textState) {
		if (textState.calcTextWidths) {
			this.pushTextWidth(textState);
		}
		Window_Base.prototype.processNewLine.call(this, textState);
		if (textState.drawingCenter) {
			this.setAlignCenter(textState);
		}
	};

	const _pauseSignSprite = useMZ ? "_pauseSignSprite" : "_windowPauseSignSprite";
	Window_FadeText.prototype.update = function() {
		Window_Base.prototype.update.call(this);
		if ($gameMessage.fadeMode()) {
			if (this._text) {
				this.updateMessage();
			}
			if (!this._text && $gameMessage.hasText()) {
				this.startMessage();
				this[_pauseSignSprite].anchor.y = 0;
				this[_pauseSignSprite].move(this[_pauseSignSprite].x, (this.height + this._allTextHeight)/2);
			}
		}
	};

	const refresh = useMZ ? "refresh" : "refreshMV";
	Window_FadeText.prototype.startMessage = function() {
		this._text = $gameMessage.allText();
		if (this._text || !useMZ) {
			this.setParam();
			this.updatePlacement();
			this[refresh]();
			this.show();
		} else {
			$gameMessage.clear();
		}
	};

	Window_FadeText.prototype.setParam = function() {
		this._count = 0;
		this._fade = $gameMessage.fadeDuration();
		this._wait = $gameMessage.fadeWaitDuration();
		this._pause = $gameMessage.fadePause();
		this._noFast = $gameMessage.fadeNoFast();
		this._resume = $gameMessage.fadeResume();
		this._alignCenter = $gameMessage.fadeAlignCenter();
		this._triggered = false;
	};

	if (!useMZ) {
		Window_FadeText.prototype.createTextState = function(text, x, y) {
			const textState = { index: 0, x: x, y: y, left: x };
			textState.text = this.convertEscapeCharacters(text);
			textState.height = this.calcTextHeight(textState, false);
			return textState;
		};

		Window_FadeText.prototype.processAllText = function(textState) {
			this.resetFontSettings();
			if (textState.drawingCenter) {
				this.setAlignCenter(textState);
			}
			while (textState.index < textState.text.length) {
				this.processCharacter(textState);
			}
			if (textState.calcTextWidths) {
				this.pushTextWidth(textState);
			}
		};
	}

	Window_FadeText.prototype.calcTextWidths = function(text) {
		if (!this._alignCenter) {
			return [];
		}
		this.resetFontSettings();
		const textState = this.createTextState(text, 0, 0, 0);
		textState.drawing = false;
		textState.calcTextWidths = true;
		textState.textWidths = [];
		this.processAllText(textState);
		return textState.textWidths;
	};

	Window_FadeText.prototype.drawTextExCenter = function(text, x, y, textWidths) {
		this.resetFontSettings();
		const textState = this.createTextState(text, x, y, 0);
		textState.drawingCenter = true;
		textState.textWidths = textWidths;
		this.processAllText(textState);
	};

	Window_FadeText.prototype.refresh = function() {
		const text = this._text;
		this.contents.clear();
		this._allTextHeight = this.textSizeEx(text).height;
		const textWidths = this.calcTextWidths(text);
		const rect = this.baseTextRect();
		rect.height += rect.y * 2;
		rect.y = (rect.height - this._allTextHeight)/2;
		if (this._alignCenter) {
			this.drawTextExCenter(text, rect.x, rect.y, textWidths);
		} else {
			this.drawTextEx(text, rect.x, rect.y, rect.width);
		}
	};

	Window_FadeText.prototype.refreshMV = function() {
		const text = this._text;
		const textState = { index: 0 };
		textState.text = this.convertEscapeCharacters(text);
		this.resetFontSettings();
		this._allTextHeight = this.calcTextHeight(textState, true);
		const textWidths = this.calcTextWidths(text);
		this.contents.clear();
		const x = this.textPadding();
		const y = (this.contentsHeight() - this._allTextHeight)/2;
		if (this._alignCenter) {
			this.drawTextExCenter(text, x, y, textWidths);
		} else {
			this.drawTextEx(text, x, y);
		}
	};

	Window_FadeText.prototype.updatePlacement = function() {
		if (useMZ) {
			const rect = this._reservedRect;
			this.move(rect.x, rect.y, rect.width, rect.height);
		}
	};

	Window_FadeText.prototype.updateMessage = function() {
		this.updateCount();
		this.updateFade();
		if (this._count >= this._fade * 2 + this._wait) {
			this.terminateMessage();
		}
	};

	Window_FadeText.prototype.updateCount = function() {
		this._count += this.isFastForward() ? this.fastForwardRate() : 1;
		if (this._pause && !this._triggered && this._count >= this._fade + this._wait) {
			this._count = this._fade + this._wait;
			this.pause = true;
			if (this.isTriggered()) {
				this.pause = false;
				this._triggered = true;
				if (seParams.name) AudioManager.playSe(seParams);
				this._count++;
			}
		}
	};

	Window_FadeText.prototype.updateFade = function() {
		this.contentsOpacity = 255;
		if (this._count <= this._fade) {
			this.contentsOpacity = 255*this._count/this._fade;
		}
		if (this._count > this._fade + this._wait) {
			this.contentsOpacity = 255-255*(this._count-this._wait-this._fade)/this._fade;
		}
	};

	Window_FadeText.prototype.isTriggered = function() {
		return (
			Input[trigger]("ok") ||
			Input[trigger]("cancel") ||
			TouchInput[trigger]()
		);
	};
	
	Window_FadeText.prototype.isFastForward = function() {
		if (this._noFast) {
			return false;
		} else {
			return (
				Input.isPressed("ok") ||
				Input.isPressed("shift") ||
				TouchInput.isPressed()
			);
		}
	};

	Window_FadeText.prototype.fastForwardRate = function() {
		return 2;
	};

	Window_FadeText.prototype.terminateMessage = function() {
		this.contentsOpacity = 0;
		this._text = null;
		$gameMessage.clear();
		this.hide();
		if (this._resume) {
			$gameMessage.setFade(this._fade, this._wait, this._noFast, this._pause, this._alignCenter);
		}
	};
}