package com.example.oceanicauthapp.ui.screens

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp
import com.example.oceanicauthapp.R
import java.util.Locale

@Composable
fun RegisterScreen(onBack: () -> Unit, currentLocale: Locale) {
	Column(
		modifier = Modifier
			.fillMaxSize()
			.padding(24.dp),
		verticalArrangement = Arrangement.Center,
		horizontalAlignment = Alignment.CenterHorizontally
	) {
		Text(
			text = stringResource(id = R.string.registration_stub),
			style = MaterialTheme.typography.titleLarge
		)
		Spacer(Modifier.height(24.dp))
		Button(onClick = onBack) { Text("Back") }
	}
}