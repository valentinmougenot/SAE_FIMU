//
//  TypeScene.swift
//  AppFimu
//
//  Created by user235496 on 3/7/23.
//

import Foundation
import SwiftUI

struct TypeScene: Identifiable, Codable, Hashable {
    var id: Int
    var libelle: String
    
    var icone: some View{
        Image("\(libelle)")
            .resizable()
            .scaledToFill()
            .frame(width: 30, height: 30)
    }
    
}
