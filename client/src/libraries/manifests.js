const manifests = [
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_ff_8_97/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_ff_13_92/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_ff_14_91/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_ff_15_90/manifest',
  // 1–7 Missing
  // 8 at CBL, part of bifolio with 97
  // 9–10 Missing
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_11/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_12/manifest',
  // 13–15 at CBL, part of bifolia with 92, 91, 90 respectively
  // 16–17 at UM
  // Folio 18 below is plated as 'BP 190'
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_190/manifest',
  // 19–28 at UM
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_29/manifest',
  // 30 at UM
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_31/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_32/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_33/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_34/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_35/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_36/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_37/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_38/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_39/manifest',
  // 40 at UM
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_41/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_42/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_43/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_44/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_45/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_46/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_47/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_48/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_49/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_50/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_51/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_52/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_53/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_54/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_55/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_56/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_57/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_58/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_59/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_60/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_61/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_62/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_63/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_64/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_65/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_66/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_67/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_68/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_69/manifest',
  // 70–85 at UM
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_86/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_87/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_88/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_89/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_93/manifest',
  'https://viewer.cbl.ie/viewer/api/v1/records/BP_II_f_94/manifest',
  // 96 Missing
  // 97 at CBL, part of bifolio with 8

];

export default manifests;
