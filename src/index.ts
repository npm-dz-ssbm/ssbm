import * as $ from "@dz-ssbm/util";
import {
  Character as SlpChar,
  GameEndMethod as GameEndMethodImport,
  GameMode as GameModeImport,
  SlippiGame,
} from "@slippi/slippi-js";

export const GameEndMethod = GameEndMethodImport;
export const GameMode = GameModeImport;

function $$(k: string): any {
  return (obj: any) => obj[k];
}

function $$_(k: string): any {
  return (obj: any, v: any) => (obj[k] = v);
}

export type SSBMChar = {
  id: number;
  name: string;
  slippiApiName: string;
  preferCSP: boolean;
  meleeCSPDirname: string;
  meleeCSPFilename: string;
};

const charRecordGetter = (recName: string) => () => {
  const charRecord = $$(recName)(ssbmChar) || {};
  $$_(recName)(ssbmChar, charRecord);
  return charRecord;
};

const charRecordRowGetter = (recName: string) => (k: any) =>
  (charRecordGetter(recName)()[k] as SSBMChar) || Character.Invalid;

const charRecordRowSetter = (recName: string) => (k: any, v: any) =>
  (charRecordGetter(recName)()[k] = v);

const setCharById = charRecordRowSetter("__charById");
const setCharBySlippiApiName = charRecordRowSetter("__charBySlippiApiName");

const getCharById = charRecordRowGetter("__charById");
const getCharBySlippiApiName = charRecordRowGetter("__charBySlippiApiName");

type SSBMCharOpts = Partial<{
  preferCSP: boolean;
  meleeCSPDirname: string;
  meleeCSPFilename: string;
}>;
function buildSsbmChar(
  id: number,
  name: string,
  slippiApiName: string,
  opts: SSBMCharOpts = {},
): SSBMChar {
  return {
    preferCSP: false,
    meleeCSPFilename: name,
    meleeCSPDirname: opts.meleeCSPFilename || name,
    id,
    name,
    slippiApiName,
    ...opts,
  };
}

const ssbmChar: typeof buildSsbmChar = (...args) => {
  const char = buildSsbmChar(...args);
  setCharById(char.id, char);
  setCharBySlippiApiName(char.slippiApiName, char);
  return char;
};

export const GAME_FIRST_FRAME = -123;
export const Character: {
  of(id: number): SSBMChar;
  ofSlippiApiName(name: string): SSBMChar;
  Falcon: SSBMChar;
  DK: SSBMChar;
  Fox: SSBMChar;
  GameAndWatch: SSBMChar;
  Kirby: SSBMChar;
  Bowser: SSBMChar;
  Link: SSBMChar;
  Luigi: SSBMChar;
  Mario: SSBMChar;
  Marth: SSBMChar;
  Mewtwo: SSBMChar;
  Ness: SSBMChar;
  Peach: SSBMChar;
  Pikachu: SSBMChar;
  ICs: SSBMChar;
  Puff: SSBMChar;
  Samus: SSBMChar;
  Yoshi: SSBMChar;
  Zelda: SSBMChar;
  Sheik: SSBMChar;
  Falco: SSBMChar;
  YLink: SSBMChar;
  Doc: SSBMChar;
  Roy: SSBMChar;
  Pichu: SSBMChar;
  Ganon: SSBMChar;
  MasterHand: SSBMChar;
  WireframeMale: SSBMChar;
  WireframeFemale: SSBMChar;
  GigaBowser: SSBMChar;
  CrazyHand: SSBMChar;
  Sandbag: SSBMChar;
  Popo: SSBMChar;
  Invalid: SSBMChar;
} = {
  of: (id) => getCharById(id),
  ofSlippiApiName: (name) => getCharBySlippiApiName(name),
  Falcon: ssbmChar(SlpChar.CAPTAIN_FALCON, "Captain Falcon", "CAPTAIN_FALCON"),
  DK: ssbmChar(SlpChar.DONKEY_KONG, "Donkey Kong", "DONKEY_KONG"),
  Fox: ssbmChar(SlpChar.FOX, "Fox", "FOX"),
  GameAndWatch: ssbmChar(
    SlpChar.GAME_AND_WATCH,
    "Mr. Game & Watch",
    "GAME_AND_WATCH",
    { meleeCSPFilename: "Mr. Game and Watch" },
  ),
  Kirby: ssbmChar(SlpChar.KIRBY, "Kirby", "KIRBY"),
  Bowser: ssbmChar(SlpChar.BOWSER, "Bowser", "BOWSER"),
  Link: ssbmChar(SlpChar.LINK, "Link", "LINK"),
  Luigi: ssbmChar(SlpChar.LUIGI, "Luigi", "LUIGI"),
  Mario: ssbmChar(SlpChar.MARIO, "Mario", "MARIO"),
  Marth: ssbmChar(SlpChar.MARTH, "Marth", "MARTH"),
  Mewtwo: ssbmChar(SlpChar.MEWTWO, "Mewtwo", "MEWTWO"),
  Ness: ssbmChar(SlpChar.NESS, "Ness", "NESS"),
  Peach: ssbmChar(SlpChar.PEACH, "Peach", "PEACH"),
  Pikachu: ssbmChar(SlpChar.PIKACHU, "Pikachu", "PIKACHU"),
  ICs: ssbmChar(SlpChar.ICE_CLIMBERS, "Ice Climbers", "ICE_CLIMBERS", {
    meleeCSPDirname: "Ice Climbers",
    meleeCSPFilename: "Ice_Climbers",
  }),
  Puff: ssbmChar(SlpChar.JIGGLYPUFF, "Jigglypuff", "JIGGLYPUFF"),
  Samus: ssbmChar(SlpChar.SAMUS, "Samus", "SAMUS"),
  Yoshi: ssbmChar(SlpChar.YOSHI, "Yoshi", "YOSHI"),
  Zelda: ssbmChar(SlpChar.ZELDA, "Zelda", "ZELDA", {
    meleeCSPDirname: "Zelda and Sheik",
  }),
  Sheik: ssbmChar(SlpChar.SHEIK, "Sheik", "SHEIK", {
    meleeCSPDirname: "Zelda and Sheik",
  }),
  Falco: ssbmChar(SlpChar.FALCO, "Falco", "FALCO"),
  YLink: ssbmChar(SlpChar.YOUNG_LINK, "Young Link", "YOUNG_LINK"),
  Doc: ssbmChar(SlpChar.DR_MARIO, "Dr. Mario", "DR_MARIO"),
  Roy: ssbmChar(SlpChar.ROY, "Roy", "ROY"),
  Pichu: ssbmChar(SlpChar.PICHU, "Pichu", "PICHU"),
  Ganon: ssbmChar(SlpChar.GANONDORF, "Ganondorf", "GANONDORF"),
  MasterHand: ssbmChar(SlpChar.MASTER_HAND, "Master Hand", ""),
  WireframeMale: ssbmChar(SlpChar.WIREFRAME_MALE, "Wireframe Male", ""),
  WireframeFemale: ssbmChar(SlpChar.WIREFRAME_FEMALE, "Wireframe Female", ""),
  GigaBowser: ssbmChar(SlpChar.GIGA_BOWSER, "Giga Bowser", ""),
  CrazyHand: ssbmChar(SlpChar.CRAZY_HAND, "Crazy Hand", ""),
  Sandbag: ssbmChar(SlpChar.SANDBAG, "Sandbag", ""),
  Popo: ssbmChar(SlpChar.POPO, "Popo", ""),
  Invalid: ssbmChar(-1, "", ""),
};

export const SlpDataMark: $.T.ZodType = $.T.object({
  process: $.T.string(),
  start: $.T.number(),
  length: $.T.number(),
  type: $.T.string(),
  openingPort: $.T.number(),
  openingType: $.T.string(),
  lastHitBy: $.T.number().nullable(),
  didKill: $.T.boolean(),
  startPercent: $.T.number(),
  totalDamage: $.T.number(),
  numMoves: $.T.number(),
  moves: $.T.array($.T.number()),
});
export type SlpDataMark = $.T.infer<typeof SlpDataMark>;

export const SlpDataPort: $.T.ZodType = $.T.object({
  port: $.T.number(),
  playerType: $.T.literal(["PLAYER", "CPU", "UNKNOWN"]),
  entrant: $.T.number(),
  cc: $.T.string().nullable(),
  displayName: $.T.string().nullable(),
  inGameTag: $.T.string().nullable(),
  charId: $.T.number().nullable(),
  colorId: $.T.number().nullable(),
  isLrasInitiator: $.T.boolean(),
  placement: $.T.number(),
  isWinner: $.T.boolean(),
  isLoser: $.T.boolean(),
  groundTechAway: $.T.number().nullable(),
  groundTechIn: $.T.number().nullable(),
  groundTechNeutral: $.T.number().nullable(),
  groundTechFail: $.T.number().nullable(),
  wallTech: $.T.number().nullable().nullable(),
  wallTechFail: $.T.number().nullable().nullable(),
  jab1: $.T.number().nullable(),
  jab2: $.T.number().nullable(),
  jab3: $.T.number().nullable(),
  jabm: $.T.number().nullable(),
  dash: $.T.number().nullable(),
  ftilt: $.T.number().nullable(),
  dtilt: $.T.number().nullable(),
  utilt: $.T.number().nullable(),
  fsmash: $.T.number().nullable(),
  dsmash: $.T.number().nullable(),
  usmash: $.T.number().nullable(),
  nair: $.T.number().nullable(),
  fair: $.T.number().nullable(),
  bair: $.T.number().nullable(),
  uair: $.T.number().nullable(),
  dair: $.T.number().nullable(),
  roll: $.T.number().nullable(),
  ledgeGrab: $.T.number().nullable(),
  spotDodge: $.T.number().nullable(),
  dashDance: $.T.number().nullable(),
  airDodge: $.T.number().nullable(),
  wavedash: $.T.number().nullable(),
  waveland: $.T.number().nullable(),
  lCancel: $.T.number().nullable(),
  lCancelFail: $.T.number().nullable(),
  edgeCancel: $.T.number().nullable(),
  edgeCancelSlow: $.T.number().nullable(),
  grab: $.T.number().nullable(),
  grabFail: $.T.number().nullable(),
  throwUp: $.T.number().nullable(),
  throwBack: $.T.number().nullable(),
  throwDown: $.T.number().nullable(),
  throwForward: $.T.number().nullable(),
  inputsButtons: $.T.number().nullable(),
  inputsTriggers: $.T.number().nullable(),
  inputsCstick: $.T.number().nullable(),
  inputsJoystick: $.T.number().nullable(),
  inputsTotal: $.T.number().nullable(),
  totalDamage: $.T.number().nullable(),
  killCount: $.T.number().nullable(),
  ipm: $.T.number().nullable(),
  dipm: $.T.number().nullable(),
  opk: $.T.number().nullable(),
  neutralRate: $.T.number().nullable(),
  counterRate: $.T.number().nullable(),
  tradeRate: $.T.number().nullable(),
});
export type SlpDataPort = $.T.infer<typeof SlpDataPort>;

export const SlpData: $.T.ZodType = $.T.object({
  slpVersion: $.T.string().nullable(),
  gameId: $.T.string(),
  sessionName: $.T.string(),
  numPlayers: $.T.number(),
  areAllPlayersParsed: $.T.boolean(),
  isTeams: $.T.boolean(),
  gameEndMethod: $.T.enum(GameEndMethod).nullable(),
  randomSeed: $.T.number(),
  stageId: $.T.number(),
  gameMode: $.T.enum(GameMode),
  inGameMode: $.T.number(),
  anyParsedConversions: $.T.boolean(),
  is1v1ParsedSingles: $.T.boolean(),
  lastFrame: $.T.number(),
  startAt: $.T.number().nullable(),
  consoleName: $.T.string().nullable(),
  platform: $.T.literal(["dolphin", "network", "nintendont"]).nullable(),
  lrasInitiatorIndex: $.T.number().nullable(),
  sessionGameNumber: $.T.number().nullable(),
  sessionTiebreakerNumber: $.T.number().nullable(),
  isRanked: $.T.boolean(),
  marks: $.T.array(SlpDataMark),
  ports: $.T.array(SlpDataPort),
});
export type SlpData = $.T.infer<typeof SlpData>;

const ParseError: $.T.VariantDef<
  "@dz-ssbm/ssbm|ParseError",
  { NoIdent: $.T.ZodUndefined }
> = $.T.defVariant("@dz-ssbm/ssbm|ParseError", {
  NoIdent: $.T.undefined(),
});
type ParseError = $.T.inferDefined<typeof ParseError>;

type PlayerInd = 0 | 1 | 2 | 3;

const ALL_PLAYER_INDS: PlayerInd[] = [0, 1, 2, 3];
type PlayerMap<T> = Partial<{ [0]: T; [1]: T; [2]: T; [3]: T }>;
const PLAYER_IND_LOOKUP: Record<string | number | symbol, PlayerInd> = {
  [0]: 0,
  [1]: 1,
  [2]: 2,
  [3]: 3,
};
function playerMap<T>(
  r: Record<any, T> | T[] | undefined | null,
): PlayerMap<T> {
  const res: PlayerMap<T> = {};
  for (const [_k, _v] of Object.entries(r || {})) {
    const k: PlayerInd | undefined = PLAYER_IND_LOOKUP[_k];
    const v = _v as T;

    if (k === undefined) {
      continue;
    }
    res[k] = v;
  }
  return res;
}

export type PlayerTypeLabel = "PLAYER" | "CPU" | "UNKNOWN";

export function parseSlpData(bytes: Uint8Array): $.Result<SlpData, ParseError> {
  return $.exec(function* () {
    const game = new SlippiGame(bytes);
    const stats = game.getStats();
    const overallStatsList = stats?.overall || [];
    const actionStatsList = stats?.actionCounts || [];
    const metadata = game.getMetadata() || {};
    const conversions = stats?.conversions || [];
    const anyParsedConversions = conversions.length > 0;
    const settings = game.getSettings();
    const randomSeed = settings?.randomSeed || 0;
    const matchInfo = $.genMaybe(function* (bind) {
      const info = yield* bind($.maybeFromNullable(settings?.matchInfo));
      const sessionId = yield* bind($.maybeFromNullable(info.sessionId));
      const gameNumber = yield* bind($.maybeFromNullable(info.gameNumber));
      const tiebreakerNumber = yield* bind(
        $.maybeFromNullable(info.tiebreakerNumber),
      );
      return { sessionId, gameNumber, tiebreakerNumber };
    });
    const metadataPlayers = playerMap(metadata?.players);
    const settingsPlayers = playerMap(settings?.players);
    const playerIndSet = new Set(
      ALL_PLAYER_INDS.filter(
        (ind) => Boolean(metadataPlayers[ind]) || Boolean(settingsPlayers[ind]),
      ),
    );
    const numPlayers = playerIndSet.size;
    const areAllPlayersParsed = [...playerIndSet].every((ind) =>
      Boolean(settingsPlayers[ind]),
    );
    const sessionName = settings?.matchInfo?.sessionId || "";
    const startAt = $.mapMaybe($.maybeFromNullable(metadata.startAt), (s) =>
      new Date(s).valueOf(),
    );
    function infoIdStr(i: $.Maybe_X<typeof matchInfo>) {
      const s = randomSeed;
      return `s.${$.Id.str(s, i.sessionId, i.gameNumber, i.tiebreakerNumber)}`;
    }
    const gameId = yield* $.xOk(
      $.some(
        $.firstMaybe(
          $.mapMaybe(startAt, (st) => `t.${$.Id.str(randomSeed, st)}`),
          $.mapMaybe(matchInfo, infoIdStr),
        ),
        ParseError.NoIdent,
      ),
    );
    const isTeams = settings?.isTeams || false;
    const stageId = settings?.stageId || 0;
    const gameMode = settings?.gameMode || GameMode.VS;
    const inGameMode = settings?.inGameMode || 0;
    const is1v1ParsedSingles =
      inGameMode === 32 &&
      !isTeams &&
      numPlayers === 2 &&
      areAllPlayersParsed &&
      anyParsedConversions;
    const frames = game.getFrames();
    const lastFrame = $.orMaybe_($.maybeFromNullable(metadata?.lastFrame), () =>
      Math.max(...Object.keys(frames).map((s) => parseInt(s, 10))),
    );
    const gameEnd = game.getGameEnd();

    function getPlayerType(ind: PlayerInd): PlayerTypeLabel {
      const readType = settingsPlayers[ind]?.type;
      if (readType === 0) {
        return "PLAYER";
      }
      if (readType === 1) {
        return "CPU";
      }
      return "UNKNOWN";
    }
    function getCC(ind: PlayerInd): string | null {
      return $.snullable(
        settingsPlayers[ind]?.connectCode || metadataPlayers[ind]?.names?.code,
      );
    }
    function getDisplayName(ind: PlayerInd): string | null {
      return $.snullable(
        settingsPlayers[ind]?.displayName ||
          metadataPlayers[ind]?.names?.netplay,
      );
    }
    function getInGameTag(ind: PlayerInd): string | null {
      return $.snullable(settingsPlayers[ind]?.nametag);
    }

    const placementsByIndex: Record<number, number> = {};
    const actionByIndex: Record<number, (typeof actionStatsList)[number]> = {};
    const overallByIndex: Record<number, (typeof overallStatsList)[number]> =
      {};
    for (const overallStats of overallStatsList) {
      overallByIndex[overallStats.playerIndex] = overallStats;
    }
    for (const actionStats of actionStatsList) {
      actionByIndex[actionStats.playerIndex] = actionStats;
    }
    for (const { playerIndex, position } of gameEnd?.placements || []) {
      if (playerIndex === undefined || position === undefined) {
        continue;
      }
      placementsByIndex[playerIndex] = position;
    }

    const winners = game.getWinners() || [];
    const winnerInds = new Set(winners.map((w) => w.playerIndex));

    return {
      slpVersion: $.snullable(settings?.slpVersion),
      gameId,
      sessionName,
      numPlayers,
      areAllPlayersParsed,
      isTeams,
      randomSeed,
      stageId,
      gameMode,
      inGameMode,
      anyParsedConversions,
      is1v1ParsedSingles,
      lastFrame,
      startAt: $.nullableFromMaybe(startAt),
      consoleName: $.snullable(metadata?.consoleNick),
      platform: metadata?.playedOn || null,
      gameEndMethod: gameEnd?.gameEndMethod || null,
      lrasInitiatorIndex: gameEnd?.lrasInitiatorIndex || null,
      sessionGameNumber: $.nullableFromMaybe(matchInfo)?.gameNumber || null,
      sessionTiebreakerNumber:
        $.nullableFromMaybe(matchInfo)?.tiebreakerNumber || null,
      isRanked: sessionName.startsWith("mode.ranked"),
      marks: conversions.flatMap((combo) => {
        if (!is1v1ParsedSingles) {
          return [];
        }
        const { playerIndex, startFrame, startPercent, endPercent } = combo;
        const { endFrame, didKill, openingType, moves } = combo;
        const port = settingsPlayers[playerIndex as PlayerInd]?.port;
        if (port === undefined) {
          return [];
        }
        const frameDelta = endFrame === undefined ? NaN : endFrame - startFrame;
        const validFrameDelta = !Number.isNaN(frameDelta) && frameDelta >= 0;

        const percentDelta =
          endPercent === undefined ? NaN : endPercent - startPercent;
        const validPercentDelta =
          !Number.isNaN(percentDelta) && percentDelta >= 0;
        return [
          {
            process: "intake",
            start: startFrame,
            length: validFrameDelta ? frameDelta : lastFrame - startFrame,
            type: "slp|stats|conversion",
            openingPort: port,
            openingType,
            lastHitBy: $.nullable(combo.lastHitBy),
            didKill: startFrame > (endFrame || 0) ? true : didKill,
            startPercent,
            totalDamage: validPercentDelta
              ? percentDelta
              : moves.reduce((dmg, m) => dmg + m.damage, 0),
            numMoves: moves.length,
            moves: moves.map((m) => m.moveId),
          },
        ];
      }),
      ports: [...playerIndSet].flatMap((ind) => {
        const port = settingsPlayers[ind]?.port;
        if (port === undefined) {
          return [];
        }
        return [
          {
            port,
            playerType: getPlayerType(ind),
            entrant: ind,
            cc: getCC(ind),
            displayName: getDisplayName(ind),
            inGameTag: getInGameTag(ind),
            charId: $.nullable(settingsPlayers[ind]?.characterId),
            colorId: $.nullable(settingsPlayers[ind]?.characterColor),
            isLrasInitiator: ind === gameEnd?.lrasInitiatorIndex,
            placement: placementsByIndex[ind],
            isWinner: winnerInds.has(ind),
            isLoser: winnerInds.size > 0 && !winnerInds.has(ind),
            groundTechAway: $.nullable(
              actionByIndex[ind]?.groundTechCount?.away,
            ),
            groundTechIn: $.nullable(actionByIndex[ind]?.groundTechCount?.in),
            groundTechNeutral: $.nullable(
              actionByIndex[ind]?.groundTechCount?.neutral,
            ),
            groundTechFail: $.nullable(
              actionByIndex[ind]?.groundTechCount?.fail,
            ),
            wallTech: $.nullable(actionByIndex[ind]?.wallTechCount?.success),
            wallTechFail: $.nullable(actionByIndex[ind]?.wallTechCount?.fail),
            jab1: $.nullable(actionByIndex[ind]?.attackCount?.jab1),
            jab2: $.nullable(actionByIndex[ind]?.attackCount?.jab2),
            jab3: $.nullable(actionByIndex[ind]?.attackCount?.jab3),
            jabm: $.nullable(actionByIndex[ind]?.attackCount?.jabm),
            dash: $.nullable(actionByIndex[ind]?.attackCount?.dash),
            ftilt: $.nullable(actionByIndex[ind]?.attackCount?.ftilt),
            dtilt: $.nullable(actionByIndex[ind]?.attackCount?.dtilt),
            utilt: $.nullable(actionByIndex[ind]?.attackCount?.utilt),
            fsmash: $.nullable(actionByIndex[ind]?.attackCount?.fsmash),
            dsmash: $.nullable(actionByIndex[ind]?.attackCount?.dsmash),
            usmash: $.nullable(actionByIndex[ind]?.attackCount?.usmash),
            nair: $.nullable(actionByIndex[ind]?.attackCount?.nair),
            fair: $.nullable(actionByIndex[ind]?.attackCount?.fair),
            bair: $.nullable(actionByIndex[ind]?.attackCount?.bair),
            uair: $.nullable(actionByIndex[ind]?.attackCount?.uair),
            dair: $.nullable(actionByIndex[ind]?.attackCount?.dair),
            roll: $.nullable(actionByIndex[ind]?.rollCount),
            ledgeGrab: $.nullable(actionByIndex[ind]?.ledgegrabCount),
            spotDodge: $.nullable(actionByIndex[ind]?.spotDodgeCount),
            dashDance: $.nullable(actionByIndex[ind]?.dashDanceCount),
            airDodge: $.nullable(actionByIndex[ind]?.airDodgeCount),
            wavedash: $.nullable(actionByIndex[ind]?.wavedashCount),
            waveland: $.nullable(actionByIndex[ind]?.wavelandCount),
            lCancel: $.nullable(actionByIndex[ind]?.lCancelCount?.success),
            lCancelFail: $.nullable(actionByIndex[ind]?.lCancelCount?.fail),
            edgeCancel: $.nullable(
              actionByIndex[ind]?.edgeCancelCount?.success,
            ),
            edgeCancelSlow: $.nullable(
              actionByIndex[ind]?.edgeCancelCount?.slow,
            ),
            grab: $.nullable(actionByIndex[ind]?.grabCount?.success),
            grabFail: $.nullable(actionByIndex[ind]?.grabCount?.fail),
            throwUp: $.nullable(actionByIndex[ind]?.throwCount?.up),
            throwBack: $.nullable(actionByIndex[ind]?.throwCount?.back),
            throwDown: $.nullable(actionByIndex[ind]?.throwCount?.down),
            throwForward: $.nullable(actionByIndex[ind]?.throwCount?.forward),
            inputsButtons: $.nullable(
              overallByIndex[ind]?.inputCounts?.buttons,
            ),
            inputsTriggers: $.nullable(
              overallByIndex[ind]?.inputCounts?.triggers,
            ),
            inputsCstick: $.nullable(overallByIndex[ind]?.inputCounts?.cstick),
            inputsJoystick: $.nullable(
              overallByIndex[ind]?.inputCounts?.joystick,
            ),
            inputsTotal: $.nullable(overallByIndex[ind]?.inputCounts?.total),
            totalDamage: $.nullable(overallByIndex[ind]?.totalDamage),
            killCount: $.nullable(overallByIndex[ind]?.killCount),
            ipm: $.nullable(overallByIndex[ind]?.inputsPerMinute?.ratio),
            dipm: $.nullable(
              overallByIndex[ind]?.digitalInputsPerMinute?.ratio,
            ),
            opk: $.nullable(overallByIndex[ind]?.openingsPerKill?.ratio),
            neutralRate: $.nullable(
              overallByIndex[ind]?.neutralWinRatio?.ratio,
            ),
            counterRate: $.nullable(
              overallByIndex[ind]?.counterHitRatio?.ratio,
            ),
            tradeRate: $.nullable(
              overallByIndex[ind]?.beneficialTradeRatio?.ratio,
            ),
          },
        ];
      }),
    };
  });
}
