//
//  AppFimuApp.swift
//  AppFimu
//
//  Created by valentin mougenot on 19/01/2023.
//

import SwiftUI

@main
struct AppFImuApp: App {    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(NewViewModel())
                .environmentObject(ArtistViewModel())
                .environmentObject(StandViewModel())
                .environmentObject(SceneViewModel())
                .environmentObject(DateViewModel())
                .environmentObject(ConcertViewModel())
                .environmentObject(CountryViewModel())
                .environmentObject(CategoryViewModel())
                .environmentObject(GenreViewModel())
        }
    }
}
