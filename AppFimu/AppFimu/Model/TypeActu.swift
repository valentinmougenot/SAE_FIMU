//
//  TypeActu.swift
//  AppFimu
//
//  Created by user235496 on 3/6/23.
//

import Foundation
import SwiftUI

struct TypeActu: Identifiable, Codable, Hashable{
    var id: Int
    var libelle: String
    var couleur: String
    
    
    var couleurFInal: Color{
        Color(hex: couleur)
    }
}
