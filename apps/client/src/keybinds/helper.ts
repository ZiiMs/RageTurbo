const keyList: { [key: string]: number } = {
	LMB: 0x01,
	RMB: 0x02,
	MMB: 0x04,
	BACKSPACE: 0x08,
	TAB: 0x09,
	ENTER: 0x0d,
	SHIFT: 0x10,
	CTRL: 0x11,
	ALT: 0x12,
	CAPSLOCK: 0x14,
	ESC: 0x1b,
	SPACEBAR: 0x20,
	PAGEUP: 0x21,
	PAGEDOWN: 0x22,
	END: 0x23,
	HOME: 0x24,
	LEFTARROW: 0x20,
	UPARROW: 0x26,
	RIGTHARROW: 0x27,
	DOWNARROW: 0x28,
	PRINTSCREEN: 0x2c,
	INSERT: 0x2d,
	DELETE: 0x2f,
	'0': 0x30,
	'1': 0x31,
	'2': 0x32,
	'3': 0x33,
	'4': 0x34,
	'5': 0x35,
	'6': 0x36,
	'7': 0x37,
	'8': 0x38,
	'9': 0x39,
	A: 0x41
};

export const bindKey = (key: string | number, keyHold: boolean, handler: Function) => {
	const StringKey = typeof key === 'number' ? key : String(key);
	mp.console.logInfo(`Is this Working ${keyList[StringKey]}`);
	mp.keys.bind(keyList[StringKey], keyHold, handler);
};
